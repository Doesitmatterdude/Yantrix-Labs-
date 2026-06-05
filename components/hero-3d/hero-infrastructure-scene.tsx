"use client";

/**
 * HeroInfrastructureScene
 *
 * Premium 3D scene for Yantrix Labs hero — an "infrastructure sculpture"
 * built around a Y-shaped junction logic that echoes the brand logo.
 *
 * Design rules (from .kiro/steering/threejs-rules.md):
 *  - Restrained, dark, cinematic, architectural
 *  - 85-90% steel/cool-gray neutrals, amber as emphasis only
 *  - One central junction, 3 branches, supporting nodes, subtle signal pulses
 *  - Quiet motion: slow drift, gentle pulse, no spinning/wobble
 *
 * Performance:
 *  - Memoized geometry, refs only mutated in useFrame
 *  - DPR capped, PerformanceMonitor scales down on weak GPUs
 *  - Reduced-motion + mobile handled by parent wrapper
 *
 * Note on colors: Three.js materials require hex/RGB values. The hex below
 * map directly to the project's oklch design tokens from globals.css —
 * amber matches var(--brand), steel matches a cool desaturated complement
 * to var(--brand-cool). This is the only way to pass colors to WebGL shaders.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Sparkles,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

/**
 * Read a CSS custom property as an "R G B" triplet (set in globals.css)
 * and convert to a Three.js-compatible rgb() string.
 */
function readCssRgbVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!v) return fallback;
  const parts = v.split(/\s+/).map((n) => Number(n));
  if (parts.length !== 3 || parts.some(Number.isNaN)) return fallback;
  const [r, g, b] = parts;
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Re-reads the 3D color tokens whenever the .dark class on <html> changes.
 * Keeps the WebGL scene in sync with the user's chosen theme.
 */
function useThemeAwareColors() {
  const [colors, setColors] = useState(() => ({
    steel: "#5b6b7a",
    steelDim: "#3a4754",
    amber: "#d99a4a",
    amberWarm: "#e8a85c",
    keyLight: "#9bb0c4",
    fillLight: "#3a4754",
    warmRim: "#e8a85c",
  }));

  useEffect(() => {
    const sync = () => {
      setColors({
        steel: readCssRgbVar("--three-steel", "#5b6b7a"),
        steelDim: readCssRgbVar("--three-steel-dim", "#3a4754"),
        amber: readCssRgbVar("--three-amber", "#d99a4a"),
        amberWarm: readCssRgbVar("--three-amber-warm", "#e8a85c"),
        keyLight: readCssRgbVar("--three-key-light", "#9bb0c4"),
        fillLight: readCssRgbVar("--three-fill-light", "#3a4754"),
        warmRim: readCssRgbVar("--three-warm-rim", "#e8a85c"),
      });
    };
    sync();

    const observer = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.attributeName === "class") {
          sync();
          break;
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return colors;
}

// ---------- Graph Data ---------------------------------------------------------

type NodePoint = {
  id: string;
  position: [number, number, number];
  size: number;
  isFocal: boolean;
};

type Edge = {
  from: string;
  to: string;
};

/**
 * Generate the Y-junction graph:
 * - 1 central core
 * - 3 branches (top-left, top-right, down) — Y-shape
 * - Each branch has 3 nodes along it
 * - A few cross-connector edges for "infrastructure" feel
 */
function useGraph() {
  return useMemo(() => {
    const nodes: NodePoint[] = [];
    const edges: Edge[] = [];

    // Central junction — focal
    nodes.push({ id: "core", position: [0, 0, 0], size: 0.42, isFocal: true });

    // Three Y-shape branch directions (slightly off-axis for asymmetry)
    const branches: { id: string; dir: [number, number, number] }[] = [
      { id: "a", dir: [-1.0, 0.85, 0.2] }, // upper-left
      { id: "b", dir: [1.05, 0.78, -0.15] }, // upper-right
      { id: "c", dir: [0.05, -1.1, 0.25] }, // downward
    ];

    branches.forEach((b) => {
      const len = Math.hypot(b.dir[0], b.dir[1], b.dir[2]);
      const nx = b.dir[0] / len;
      const ny = b.dir[1] / len;
      const nz = b.dir[2] / len;

      const stops = [1.4, 2.6, 3.8];
      let prev = "core";
      stops.forEach((d, i) => {
        const id = `${b.id}${i}`;
        // small lateral offset so it doesn't feel mechanical
        const lateral = Math.sin(i * 1.3) * 0.18 * (i + 1) * 0.3;
        const px = nx * d + lateral * 0.5;
        const py = ny * d - lateral * 0.4;
        const pz = nz * d + lateral * 0.6;
        nodes.push({
          id,
          position: [px, py, pz],
          size: 0.16 - i * 0.02,
          isFocal: i === 1, // middle node of each branch is a focal accent
        });
        edges.push({ from: prev, to: id });
        prev = id;
      });
    });

    // A few cross-connectors to feel like an orchestration network
    edges.push({ from: "a0", to: "b0" });
    edges.push({ from: "b1", to: "c0" });
    edges.push({ from: "a1", to: "c1" });

    return { nodes, edges };
  }, []);
}

// ---------- Sub-Components -----------------------------------------------------

/**
 * Edge — thin tube geometry (more premium than flat line, light catches surface)
 */
function EdgeTube({
  from,
  to,
  color,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
}) {
  const geometry = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const mid = start.clone().lerp(end, 0.5);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return new THREE.TubeGeometry(curve, 16, 0.012, 6, false);
  }, [from, to]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        metalness={0.4}
        roughness={0.7}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

/**
 * Node — sphere with subtle emissive on focal points
 * Pulses very gently (breathing) for focal nodes only
 */
function Node({
  position,
  size,
  isFocal,
  index,
  steelColor,
  amberColor,
  amberWarmColor,
}: {
  position: [number, number, number];
  size: number;
  isFocal: boolean;
  index: number;
  steelColor: string;
  amberColor: string;
  amberWarmColor: string;
}) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!isFocal || !matRef.current) return;
    const t = state.clock.elapsedTime + index * 0.7;
    matRef.current.emissiveIntensity = 0.55 + Math.sin(t * 0.8) * 0.15;
  });

  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial
        ref={matRef}
        color={isFocal ? amberColor : steelColor}
        emissive={isFocal ? amberWarmColor : "#000000"}
        emissiveIntensity={isFocal ? 0.6 : 0}
        metalness={0.55}
        roughness={isFocal ? 0.35 : 0.55}
      />
    </mesh>
  );
}

/**
 * Signal pulse — small amber sphere traveling along an edge
 * Continuous loop, ultra-subtle, communicates "data flowing through pipes"
 */
function SignalPulse({
  from,
  to,
  speed = 0.25,
  delay = 0,
  amberColor,
  amberWarmColor,
}: {
  from: [number, number, number];
  to: [number, number, number];
  speed?: number;
  delay?: number;
  amberColor: string;
  amberWarmColor: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const mid = start.clone().lerp(end, 0.5);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [from, to]);

  const tmpVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime + delay) * speed) % 1;
    curve.getPoint(t, tmpVec);
    ref.current.position.copy(tmpVec);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshStandardMaterial
        color={amberWarmColor}
        emissive={amberColor}
        emissiveIntensity={2.2}
        toneMapped={false}
      />
    </mesh>
  );
}

// ---------- Main Scene ---------------------------------------------------------

export function HeroInfrastructureScene({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { nodes, edges } = useGraph();
  const { mouse } = useThree();
  const [, setDpr] = useState<number>(1.25);
  const colors = useThemeAwareColors();

  // Pre-compute edge endpoint pairs for rendering
  const edgePairs = useMemo(() => {
    const map = new Map(nodes.map((n) => [n.id, n.position]));
    return edges.map((e) => ({
      from: map.get(e.from)!,
      to: map.get(e.to)!,
    }));
  }, [nodes, edges]);

  // Pick a sparse selection of edges to animate signal pulses on
  const pulseEdges = useMemo(() => {
    return [
      edgePairs[2], // first branch outer
      edgePairs[5], // second branch outer
      edgePairs[8], // third branch outer
      edgePairs[10], // a cross-connector
    ].filter(Boolean);
  }, [edgePairs]);

  // Subtle group drift + mouse parallax (clamped, smoothed)
  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    // Slow continuous drift
    groupRef.current.rotation.y += delta * 0.04;
    // Very subtle mouse parallax
    const targetRotX = mouse.y * 0.08;
    const targetRotZ = -mouse.x * 0.04;
    groupRef.current.rotation.x +=
      (targetRotX - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.z +=
      (targetRotZ - groupRef.current.rotation.z) * 0.04;
  });

  return (
    <>
      {/* Performance scaling — auto-reduce DPR if FPS drops */}
      <PerformanceMonitor
        onIncline={() => setDpr(1.5)}
        onDecline={() => setDpr(1)}
      />
      <AdaptiveDpr pixelated={false} />
      <AdaptiveEvents />

      {/* Cinematic low-key lighting (theme-aware) */}
      <ambientLight intensity={0.15} color={colors.fillLight} />
      {/* Cool key from upper-left */}
      <directionalLight
        position={[-4, 6, 3]}
        intensity={0.7}
        color={colors.keyLight}
      />
      {/* Subtle warm rim from lower-right (echoes amber accent) */}
      <pointLight
        position={[5, -2, 4]}
        intensity={1.1}
        color={colors.warmRim}
        distance={12}
        decay={2}
      />
      {/* Soft fill from behind for silhouette separation */}
      <pointLight
        position={[0, 1, -5]}
        intensity={0.4}
        color={colors.fillLight}
        distance={10}
      />

      <group ref={groupRef} dispose={null}>
        {/* Edges — connection tubes between nodes */}
        {edgePairs.map((e, i) => (
          <EdgeTube
            key={`e-${i}`}
            from={e.from}
            to={e.to}
            color={colors.steelDim}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <Node
            key={n.id}
            position={n.position}
            size={n.size}
            isFocal={n.isFocal}
            index={i}
            steelColor={colors.steel}
            amberColor={colors.amber}
            amberWarmColor={colors.amberWarm}
          />
        ))}

        {/* Signal pulses — only when motion allowed */}
        {!reducedMotion &&
          pulseEdges.map((e, i) => (
            <SignalPulse
              key={`pulse-${i}`}
              from={e.from}
              to={e.to}
              speed={0.18 + i * 0.04}
              delay={i * 1.5}
              amberColor={colors.amber}
              amberWarmColor={colors.amberWarm}
            />
          ))}

        {/* Atmospheric depth particles — extremely subtle */}
        {!reducedMotion && (
          <Sparkles
            count={28}
            scale={[8, 6, 6]}
            size={1.4}
            speed={0.12}
            opacity={0.35}
            color={colors.steel}
            noise={0.4}
          />
        )}
      </group>

      {/* Post-processing — restrained, premium */}
      {!reducedMotion && (
        <EffectComposer multisampling={0}>
          <Bloom
            mipmapBlur
            intensity={0.45}
            luminanceThreshold={0.85}
            luminanceSmoothing={0.3}
            radius={0.65}
          />
          <Vignette eskil={false} offset={0.35} darkness={0.65} />
          <Noise
            premultiply
            opacity={0.025}
            blendFunction={BlendFunction.OVERLAY}
          />
        </EffectComposer>
      )}
    </>
  );
}

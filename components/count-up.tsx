"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

export function CountUp({
  to,
  duration = 1.6,
  suffix = "",
  className,
}: {
  to: number
  duration?: number
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20%" })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * to))
      if (t < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}

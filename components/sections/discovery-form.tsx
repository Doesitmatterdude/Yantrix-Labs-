"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Lock,
  Zap,
  Shield,
  Target,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const SERVICE_OPTIONS = [
  "Website / Landing Page",
  "Mobile App",
  "Software / SaaS",
  "AI Automation",
  "AI Chatbot / Agent",
  "Custom Integration",
  "Something Else",
];

const BUDGET_OPTIONS = [
  "Under ₹50K",
  "₹50K – ₹1.5L",
  "₹1.5L – ₹5L",
  "₹5L – ₹15L",
  "₹15L+",
  "Not sure yet",
];

const TIMELINE_OPTIONS = [
  "ASAP (within 2 weeks)",
  "Within 1 month",
  "1–3 months",
  "Just exploring",
];

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: "Secure & confidential",
    desc: "No data shared with third parties.",
  },
  {
    icon: Zap,
    title: "Response within 2 hours",
    desc: "During IST business hours.",
  },
  {
    icon: Target,
    title: "No obligation",
    desc: "Just a clear, honest conversation.",
  },
];

interface FormErrors {
  name?: string;
  email?: string;
  whatsapp?: string;
  services?: string;
  budget?: string;
  timeline?: string;
}

export function DiscoveryForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [brief, setBrief] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Please enter your full name.";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!whatsapp || !/^\d{10}$/.test(whatsapp)) {
      newErrors.whatsapp = "Please enter a valid 10-digit number.";
    }
    if (services.length === 0) {
      newErrors.services = "Please select at least one service.";
    }
    if (!budget) {
      newErrors.budget = "Please select a budget range.";
    }
    if (!timeline) {
      newErrors.timeline = "Please select a timeline.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `🔔 *New Discovery Inquiry — Yantrix Labs*`,
      ``,
      `👤 *Name:* ${name.trim()}`,
      `🏢 *Company:* ${company.trim() || "—"}`,
      `📧 *Email:* ${email.trim()}`,
      `📱 *WhatsApp:* ${whatsapp}`,
      ``,
      `🛠 *Services Needed:*`,
      services.join(", "),
      ``,
      `💰 *Budget:* ${budget}`,
      `📅 *Timeline:* ${timeline}`,
      ``,
      `📝 *Brief:*`,
      brief.trim() || "No brief provided.",
    ];
    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);

    // Redirect after 1.2s success animation
    setTimeout(() => {
      const msg = buildWhatsAppMessage();
      window.open(`https://wa.me/919251111358?text=${msg}`, "_blank");
    }, 1200);
  };

  return (
    <div className="space-y-12">
      {/* ── Terminal Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO }}
        className="relative"
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute -inset-8 -z-10 rounded-3xl opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, var(--brand-glow-soft), transparent)",
          }}
        />

        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_8px_32px_-12px_rgba(0,0,0,0.3)]">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-border/40 bg-secondary/30 px-5 py-3">
            <div className="flex gap-1.5">
              <div className="size-2.5 rounded-full bg-foreground/15" />
              <div className="size-2.5 rounded-full bg-foreground/15" />
              <div className="size-2.5 rounded-full bg-foreground/15" />
            </div>
            <div className="ml-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/30">
              yantrix · discovery call
            </div>
          </div>

          {/* Form body */}
          <div className="relative p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ ease: EASE_OUT_EXPO }}
                  className="space-y-6"
                >
                  {/* ── Row 1: Name + Company ── */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name)
                            setErrors((p) => ({ ...p, name: undefined }));
                        }}
                        className="h-12 w-full rounded-xl border border-border/60 bg-background/50 px-4 text-sm text-foreground placeholder:text-foreground/30 outline-none transition-all focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
                      />
                      {errors.name && (
                        <p className="mt-1 text-[11px] text-destructive">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        placeholder="Your company (optional)"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="h-12 w-full rounded-xl border border-border/60 bg-background/50 px-4 text-sm text-foreground placeholder:text-foreground/30 outline-none transition-all focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
                      />
                    </div>
                  </div>

                  {/* ── Row 2: Email + WhatsApp ── */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                        Email *
                      </label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email)
                            setErrors((p) => ({ ...p, email: undefined }));
                        }}
                        className="h-12 w-full rounded-xl border border-border/60 bg-background/50 px-4 text-sm text-foreground placeholder:text-foreground/30 outline-none transition-all focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="10-digit number"
                        value={whatsapp}
                        onChange={(e) => {
                          setWhatsapp(
                            e.target.value.replace(/\D/g, "").slice(0, 10),
                          );
                          if (errors.whatsapp)
                            setErrors((p) => ({ ...p, whatsapp: undefined }));
                        }}
                        className="h-12 w-full rounded-xl border border-border/60 bg-background/50 px-4 text-sm text-foreground placeholder:text-foreground/30 outline-none transition-all focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
                      />
                      {errors.whatsapp && (
                        <p className="mt-1 text-[11px] text-destructive">
                          {errors.whatsapp}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ── Services Multi-Select Chips ── */}
                  <div>
                    <label className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                      What do you need? *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map((service) => {
                        const isActive = services.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
                              isActive
                                ? "border-brand/60 bg-brand/10 text-brand shadow-[0_0_12px_-4px_var(--brand)]"
                                : "border-border/60 bg-background/50 text-foreground/60 hover:border-foreground/30 hover:text-foreground/80"
                            }`}
                          >
                            {isActive && (
                              <CheckCircle2 className="mr-1 inline size-3" />
                            )}
                            {service}
                          </button>
                        );
                      })}
                    </div>
                    {errors.services && (
                      <p className="mt-1.5 text-[11px] text-destructive">
                        {errors.services}
                      </p>
                    )}
                  </div>

                  {/* ── Row 3: Budget + Timeline ── */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                        Budget Range *
                      </label>
                      <div className="relative">
                        <select
                          value={budget}
                          onChange={(e) => {
                            setBudget(e.target.value);
                            if (errors.budget)
                              setErrors((p) => ({ ...p, budget: undefined }));
                          }}
                          className="h-12 w-full appearance-none rounded-xl border border-border/60 bg-background/50 px-4 pr-10 text-sm text-foreground outline-none transition-all focus:border-brand/60 focus:ring-2 focus:ring-brand/20 [&:invalid]:text-foreground/30"
                        >
                          <option value="" disabled>
                            Select budget
                          </option>
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
                      </div>
                      {errors.budget && (
                        <p className="mt-1 text-[11px] text-destructive">
                          {errors.budget}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                        Ideal Timeline *
                      </label>
                      <div className="relative">
                        <select
                          value={timeline}
                          onChange={(e) => {
                            setTimeline(e.target.value);
                            if (errors.timeline)
                              setErrors((p) => ({ ...p, timeline: undefined }));
                          }}
                          className="h-12 w-full appearance-none rounded-xl border border-border/60 bg-background/50 px-4 pr-10 text-sm text-foreground outline-none transition-all focus:border-brand/60 focus:ring-2 focus:ring-brand/20 [&:invalid]:text-foreground/30"
                        >
                          <option value="" disabled>
                            Select timeline
                          </option>
                          {TIMELINE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
                      </div>
                      {errors.timeline && (
                        <p className="mt-1 text-[11px] text-destructive">
                          {errors.timeline}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ── Project Brief ── */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                      Project Brief
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your project in a few lines..."
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      className="w-full resize-none rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 outline-none transition-all focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
                    />
                  </div>

                  {/* ── Submit ── */}
                  <div className="flex flex-col-reverse items-center gap-4 pt-2 sm:flex-row sm:justify-between sm:gap-0">
                    <p className="flex items-center gap-1.5 text-[10px] text-foreground/30">
                      <Lock className="size-2.5" /> Your details are secure &
                      confidential.
                    </p>
                    <Button
                      type="submit"
                      className="h-12 w-full rounded-full bg-foreground px-7 text-sm font-medium text-background shadow-[0_4px_12px_-4px_var(--brand)] transition-all duration-300 hover:scale-[1.03] hover:bg-foreground/90 hover:shadow-[0_8px_24px_-8px_var(--brand)] sm:w-auto"
                    >
                      Start the Conversation
                      <ArrowRight className="ml-1.5 size-3.5" />
                    </Button>
                  </div>
                </motion.form>
              ) : (
                /* ── Success State ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ease: EASE_OUT_EXPO, duration: 0.5 }}
                  className="flex min-h-[300px] flex-col items-center justify-center py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="rounded-full border border-brand/30 bg-brand/10 p-4 mb-6"
                  >
                    <CheckCircle2 className="size-8 text-brand" />
                  </motion.div>
                  <h3 className="font-display text-xl tracking-tight text-foreground">
                    Redirecting you to WhatsApp…
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                    We typically respond within 2 hours during business hours
                    (IST). Looking forward to hearing about your project!
                  </p>

                  {/* Loading shimmer bar */}
                  <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-border/40">
                    <motion.div
                      className="h-full rounded-full bg-brand"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* ── Trust Signals ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {TRUST_ITEMS.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3 rounded-2xl border border-border/40 bg-card/50 p-4"
          >
            <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-border/40 bg-background/50 text-brand">
              <item.icon className="size-4" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">
                {item.title}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

"use client"

import { useEffect, useRef, useState } from "react"

type EasingCurve = {
  name: string
  bezier: [number, number, number, number]
  description: string
}

const curves: EasingCurve[] = [
  { name: "--ease-out", bezier: [0.25, 1, 0.5, 1], description: "Smooth deceleration, used everywhere" },
  { name: "--ease-out-sharp", bezier: [0.16, 1, 0.3, 1], description: "Quick interactions, hover states" },
  { name: "--ease-in-out", bezier: [0.4, 0, 0.2, 1], description: "Tab switches, carousel slides" },
  { name: "--ease-out-back", bezier: [0.34, 1.2, 0.64, 1], description: "Gentle bounce, CTA buttons" },
]

function sampleCubicBezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const u = 1 - t
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}

function EasingSvgPath(bezier: [number, number, number, number], steps = 40): string {
  const points: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = sampleCubicBezier(0, bezier[0], bezier[2], 1, t)
    const y = sampleCubicBezier(0, bezier[1], bezier[3], 1, t)
    points.push([x * 100, (1 - y) * 100])
  }
  return points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ")
}

function EasingCurveCard({ curve, index }: { curve: EasingCurve; index: number }) {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const pathD = EasingSvgPath(curve.bezier)
  const dashLen = 400

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const dur = 1200
    function raf(now: number) {
      const p = Math.min((now - start) / dur, 1)
      setProgress(p)
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [visible])

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-xl border bg-card p-4 transition-all duration-500 hover:shadow-lg"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <code className="text-xs font-mono text-foreground">{curve.name}</code>
        <span className="text-[11px] text-muted-foreground font-mono">
          cubic-bezier({curve.bezier.join(", ")})
        </span>
      </div>

      <svg viewBox="0 0 100 100" className="h-16 w-full" preserveAspectRatio="none">
        {/* Grid */}
        <line x1="0" y1="100" x2="100" y2="100" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <line x1="0" y1="0" x2="0" y2="100" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="100" y2="0" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="2,2" />
        <line x1="0" y1="0" x2="100" y2="0" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="2,2" />
        {/* Diagonal reference */}
        <line x1="0" y1="100" x2="100" y2="0" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="3,3" opacity="0.4" />

        {/* Animated path */}
        <path
          d={pathD}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashLen}
          strokeDashoffset={dashLen * (1 - progress)}
          className="transition-all"
        />

        {/* End dot */}
        <circle cx="100" cy="0" r="2.5" fill="hsl(var(--primary))" opacity={progress > 0.9 ? 1 : 0} />
      </svg>

      <p className="mt-1.5 text-xs text-muted-foreground">{curve.description}</p>
    </div>
  )
}

export function EasingCurveVisualizer() {
  return (
    <div className="not-prose my-6">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Live easing curves — scroll to animate
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {curves.map((curve, i) => (
          <EasingCurveCard key={curve.name} curve={curve} index={i} />
        ))}
      </div>
    </div>
  )
}
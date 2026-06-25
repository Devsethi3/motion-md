"use client"

import { useEffect, useRef, useState } from "react"

const durations = [
  { name: "instant", value: "60ms", desc: "Toggle states, checkbox ticks", width: 60 },
  { name: "micro", value: "100ms", desc: "Icon swaps, badge updates", width: 100 },
  { name: "fast", value: "160ms", desc: "Hover color transitions", width: 160 },
  { name: "base", value: "240ms", desc: "Standard UI transitions", width: 240 },
  { name: "medium", value: "360ms", desc: "Card reveals, dropdown opens", width: 360 },
  { name: "slow", value: "500ms", desc: "Section entrances, hero content", width: 500 },
  { name: "slower", value: "700ms", desc: "Hero carousel transitions", width: 700 },
]

export function DurationScaleTimeline() {
  const [visible, setVisible] = useState(false)
  const [animProgress, setAnimProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

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
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const dur = 1000
    function raf(now: number) {
      const p = Math.min((now - start) / dur, 1)
      setAnimProgress(p)
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [visible])

  const maxVal = Math.max(...durations.map((d) => d.width))

  return (
    <div
      ref={ref}
      className="not-prose my-6 overflow-hidden rounded-xl border bg-card p-4 sm:p-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Duration scale — each bar pulses at its actual speed
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {durations.map((d, i) => {
          const pct = (d.width / maxVal) * 100
          const delay = i * 80
          return (
            <div
              key={d.name}
              className="group"
              style={{
                opacity: animProgress > 0 ? 1 : 0,
                transform: animProgress > 0 ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.4s ease-out ${delay}ms, transform 0.4s ease-out ${delay}ms`,
              }}
            >
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono text-foreground">
                    --duration-{d.name}
                  </code>
                  <span className="text-xs text-muted-foreground">{d.desc}</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">{d.value}</span>
              </div>
              <div className="relative h-6 w-full overflow-hidden rounded-md bg-muted">
                <div
                  className="absolute inset-y-0 left-0 rounded-md bg-primary/20"
                  style={{
                    width: `${Math.max(pct, 10)}%`,
                    transition: `width 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                  }}
                >
                  <div
                    className="h-full w-full rounded-md bg-primary"
                    style={{
                      animation: visible ? `durationPulse ${d.width}ms ease-in-out infinite` : "none",
                      animationDelay: `${delay + 800}ms`,
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes durationPulse {
          0%, 100% { opacity: 0.7; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.02); }
        }
      `}</style>
    </div>
  )
}
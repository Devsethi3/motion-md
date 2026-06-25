"use client"

import { useEffect, useRef, useState } from "react"

const colors = [
  { name: "Background", hex: "#FFFFFF", role: "pure white canvas" },
  { name: "Surface", hex: "#F5F5F5", role: "light grey cards" },
  { name: "Surface hover", hex: "#EBEBEB", role: "pressed/hover state" },
  { name: "Text primary", hex: "#1A1A1A", role: "near-black text" },
  { name: "Brand purple", hex: "#7B61FF", role: "primary CTA, highlights" },
]

export function ColorContextSwatches() {
  const [visible, setVisible] = useState(false)
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
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="not-prose my-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Color palette — visual reference
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
        {colors.map((c, i) => (
          <div
            key={c.hex}
            className="group overflow-hidden rounded-xl border bg-card transition-all duration-500 hover:shadow-md"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <div
              className="h-20 w-full transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: c.hex }}
            />
            <div className="p-2.5">
              <p className="text-xs font-medium text-foreground">{c.name}</p>
              <p className="text-[11px] text-muted-foreground">{c.hex}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground/70">{c.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
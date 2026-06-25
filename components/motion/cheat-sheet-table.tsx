"use client"

import { useEffect, useRef, useState } from "react"

const rows = [
  { element: "Nav hover", duration: "150ms", easing: "linear", transform: "opacity only" },
  { element: "Button hover", duration: "150ms", easing: "cubic-bezier(0.16, 1, 0.3, 1)", transform: "opacity" },
  { element: "Button active", duration: "80ms", easing: "cubic-bezier(0.16, 1, 0.3, 1)", transform: "scale(0.94)" },
  { element: "Badge entrance", duration: "300ms", easing: "cubic-bezier(0.16, 1, 0.3, 1)", transform: "scale(0.9→1)" },
  { element: "Hero word stagger", duration: "600ms", easing: "cubic-bezier(0.16, 1, 0.3, 1)", transform: "translateY(12px→0)" },
  { element: "Section reveal", duration: "500ms", easing: "cubic-bezier(0.16, 1, 0.3, 1)", transform: "translateY(16px→0)" },
  { element: "Tab panel enter", duration: "250ms", easing: "cubic-bezier(0.16, 1, 0.3, 1)", transform: "translateY(12px→0)" },
  { element: "Screenshot", duration: "600ms", easing: "cubic-bezier(0.16, 1, 0.3, 1)", transform: "translateY(20px)+scale" },
  { element: "Stagger delay step", duration: "+80ms", easing: "—", transform: "per child" },
]

export function CheatSheetTable() {
  const [visible, setVisible] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="not-prose my-6 overflow-hidden rounded-xl border bg-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <div className="border-b border-border bg-muted/40 px-4 py-2">
        <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Summary cheat sheet — hover rows to highlight
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase text-muted-foreground">Element</th>
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase text-muted-foreground">Duration</th>
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase text-muted-foreground">Easing</th>
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase text-muted-foreground">Transform</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.element}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                className="border-b border-border/50 transition-all duration-200 last:border-0"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-12px)",
                  transition: `opacity 0.3s ease-out ${i * 60}ms, transform 0.3s ease-out ${i * 60}ms, background-color 0.2s`,
                  backgroundColor: hoveredRow === i ? "hsl(var(--accent) / 0.3)" : "transparent",
                }}
              >
                <td className="px-4 py-2.5 font-medium text-foreground">{row.element}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{row.duration}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground max-w-[200px] truncate">{row.easing}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{row.transform}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
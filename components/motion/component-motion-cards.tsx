"use client"

import { useState } from "react"
import { CopyButton } from "@/components/copy-button"
import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block"

const components = [
  {
    name: "Primary CTA",
    css: `.btn-primary {
  transition:
    background  160ms var(--ease-out),
    transform   100ms var(--ease-out),
    box-shadow  160ms var(--ease-out);
  background: #1A1A1A;
  color: #FFFFFF;
  border-radius: 8px;
}

.btn-primary:hover {
  background: #000000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: scale(0.97) translateY(0);
  transition-duration: 60ms;
}`,
  },
  {
    name: "Nav Link",
    css: `.nav-link {
  transition: opacity 150ms linear;
  opacity: 0.7;
}

.nav-link:hover {
  opacity: 1;
}

.nav-link.active {
  opacity: 1;
}`,
  },
  {
    name: "Card",
    css: `.card {
  transition:
    transform 240ms var(--ease-out),
    box-shadow 240ms var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}`,
  },
]

export function ComponentMotionCards() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="not-prose my-6 space-y-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Interactive component motion — hover and click the cards
        </span>
      </div>

      {components.map((comp) => (
        <div
          key={comp.name}
          className="overflow-hidden rounded-xl border bg-card"
        >
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
            <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              {comp.name}
            </span>
            <CopyButton text={comp.css} variant="outline" size="icon-sm" />
          </div>

          <div className="grid gap-0 sm:grid-cols-2">
            {/* Code */}
            <div className="border-r border-border">
              <CodeBlock className="border-0 rounded-none">
                <CodeBlockCode code={comp.css} language="css" />
              </CodeBlock>
            </div>

            {/* Interactive preview */}
            <div className="flex items-center justify-center bg-muted/20 p-8">
              {comp.name === "Primary CTA" && (
                <button
                  onMouseEnter={() => setHovered("cta")}
                  onMouseLeave={() => setHovered(null)}
                  onMouseDown={() => setActive("cta")}
                  onMouseUp={() => setActive(null)}
                  className="rounded-lg bg-[#1A1A1A] px-6 py-3 text-sm font-medium text-white transition-all duration-150 dark:bg-white dark:text-black"
                  style={{
                    transform:
                      active === "cta"
                        ? "scale(0.97) translateY(0)"
                        : hovered === "cta"
                          ? "translateY(-1px)"
                          : "translateY(0)",
                    boxShadow:
                      hovered === "cta"
                        ? "0 2px 8px rgba(0,0,0,0.2)"
                        : "0 1px 3px rgba(0,0,0,0.1)",
                    transitionDuration: active === "cta" ? "60ms" : "160ms",
                  }}
                >
                  Hover & click me
                </button>
              )}

              {comp.name === "Nav Link" && (
                <div className="flex gap-4">
                  {["Home", "Products", "About"].map((item) => (
                    <button
                      key={item}
                      onMouseEnter={() => setHovered(item)}
                      onMouseLeave={() => setHovered(null)}
                      className="text-sm transition-opacity duration-150"
                      style={{
                        opacity: hovered === item ? 1 : 0.7,
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}

              {comp.name === "Card" && (
                <div
                  onMouseEnter={() => setHovered("card")}
                  onMouseLeave={() => setHovered(null)}
                  className="w-full max-w-[200px] cursor-pointer rounded-xl border bg-background p-4 transition-all duration-240"
                  style={{
                    transform: hovered === "card" ? "translateY(-2px)" : "translateY(0)",
                    boxShadow:
                      hovered === "card"
                        ? "0 8px 24px rgba(0,0,0,0.1)"
                        : "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="mb-2 h-20 w-full rounded-lg bg-muted" />
                  <div className="h-3 w-3/4 rounded bg-muted-foreground/20" />
                  <div className="mt-1.5 h-2 w-1/2 rounded bg-muted-foreground/10" />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
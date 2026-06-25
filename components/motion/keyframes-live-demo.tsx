"use client"

import { useState } from "react"
import { CopyButton } from "@/components/copy-button"
import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block"

const demos = [
  {
    name: "fadeUp",
    label: "Fade Up",
    css: `@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
    style: {
      animation: "demoFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both",
    },
  },
  {
    name: "fadeIn",
    label: "Fade In",
    css: `@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}`,
    style: {
      animation: "demoFadeIn 0.4s ease-out both",
    },
  },
  {
    name: "scaleIn",
    label: "Scale In",
    css: `@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}`,
    style: {
      animation: "demoScaleIn 0.4s cubic-bezier(0.16,1,0.3,1) both",
    },
  },
]

export function KeyframesLiveDemo() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [playCount, setPlayCount] = useState(0)

  const handlePlay = (name: string) => {
    setActiveDemo(name)
    setPlayCount((c) => c + 1)
    setTimeout(() => setActiveDemo(null), 600)
  }

  return (
    <div className="not-prose my-6 space-y-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Interactive keyframes — click to play
        </span>
      </div>

      {demos.map((demo) => (
        <div
          key={demo.name}
          className="overflow-hidden rounded-xl border bg-card"
        >
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
            <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              {demo.label}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePlay(demo.name)}
                className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={activeDemo === demo.name ? "text-primary" : "text-muted-foreground"}
                >
                  <path
                    d="M3 1.5L10 6L3 10.5V1.5Z"
                    fill="currentColor"
                  />
                </svg>
                Play
              </button>
              <CopyButton text={demo.css} variant="outline" size="icon-sm" />
            </div>
          </div>

          <div className="grid gap-0 sm:grid-cols-2">
            {/* Code side */}
            <div className="border-r border-border">
              <CodeBlock className="border-0 rounded-none">
                <CodeBlockCode code={demo.css} language="css" />
              </CodeBlock>
            </div>

            {/* Preview side */}
            <div className="flex items-center justify-center bg-muted/20 p-8">
              <div
                key={`${demo.name}-${playCount}`}
                className="flex h-24 w-24 items-center justify-center rounded-xl bg-primary/10 text-2xl"
                style={{
                  animation:
                    activeDemo === demo.name
                      ? `${demo.name} 0.5s cubic-bezier(0.16,1,0.3,1) both`
                      : "none",
                  opacity: activeDemo !== demo.name ? 0.3 : undefined,
                  transform: activeDemo !== demo.name ? "scale(0.96)" : undefined,
                  transition: "opacity 0.3s, transform 0.3s",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Inject keyframes for demos */}
      <style jsx>{`
        @keyframes demoFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes demoFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes demoScaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
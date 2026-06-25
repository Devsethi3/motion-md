"use client"

import { useState, useRef, useEffect, useCallback } from "react"

type SpringConfig = {
  stiffness: number
  damping: number
  mass: number
}

function simulateSpring(cfg: SpringConfig, initialVel = 0) {
  const { stiffness, damping, mass } = cfg
  let x = 1
  let v = initialVel
  const dt = 1 / 60
  const samples: { t: number; x: number }[] = [{ t: 0, x: 1 }]

  for (let t = dt; t < 1.5; t += dt) {
    const a = (-stiffness * x - damping * v) / mass
    v += a * dt
    x += v * dt
    samples.push({ t, x: Math.max(0, x) })
    if (Math.abs(x) < 0.001 && Math.abs(v) < 0.001) break
  }
  return samples
}

export function SpringVisualizer() {
  const [config, setConfig] = useState<SpringConfig>({ stiffness: 400, damping: 30, mass: 0.8 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [animProgress, setAnimProgress] = useState(0)
  const animRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  const samples = simulateSpring(config)
  const maxSample = Math.max(...samples.map((s) => s.x))
  const duration = samples[samples.length - 1]?.t ?? 1

  const triggerSpring = useCallback(() => {
    startTimeRef.current = performance.now()
    setIsPlaying(true)
    setAnimProgress(0)
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    const dur = duration * 1000
    function raf(now: number) {
      const p = Math.min((now - startTimeRef.current) / dur, 1)
      setAnimProgress(p)
      if (p < 1) animRef.current = requestAnimationFrame(raf)
      else setIsPlaying(false)
    }
    animRef.current = requestAnimationFrame(raf)
    return () => cancelAnimationFrame(animRef.current)
  }, [isPlaying, duration])

  const currentSamples = isPlaying
    ? samples.filter((s) => s.t <= animProgress * duration)
    : samples

  const currentX = currentSamples.length > 0 ? currentSamples[currentSamples.length - 1].x : 1
  const ballY = 100 - (currentX / maxSample) * 80

  const pathD = samples
    .map(
      (s, i) =>
        `${i === 0 ? "M" : "L"}${(s.t / duration) * 200},${100 - (s.x / maxSample) * 80}`
    )
    .join(" ")

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
        <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Spring physics playground
        </span>
        <button
          onClick={triggerSpring}
          className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 1.5L10 6L3 10.5V1.5Z" fill="currentColor" />
          </svg>
          Play
        </button>
      </div>

      <div className="grid gap-0 sm:grid-cols-2">
        {/* Visualizer */}
        <div className="border-r border-border p-4">
          <svg viewBox="0 0 200 100" className="h-32 w-full">
            {/* Grid */}
            <line x1="0" y1="100" x2="200" y2="100" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <line x1="0" y1="20" x2="200" y2="20" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="2,2" />
            <line x1="0" y1="60" x2="200" y2="60" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="2,2" />

            {/* Path */}
            <path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.4} />

            {/* Animated ball */}
            <circle cx={Math.min((animProgress * duration / duration) * 200, 200)} cy={ballY} r="5" fill="hsl(var(--primary))">
              <animate attributeName="r" values="5;6;5" dur="0.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-4 p-4">
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">Stiffness</label>
              <span className="text-xs font-mono text-foreground">{config.stiffness}</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="10"
              value={config.stiffness}
              onChange={(e) => {
                setConfig({ ...config, stiffness: Number(e.target.value) })
                triggerSpring()
              }}
              className="mt-1 h-1.5 w-full appearance-none rounded-full bg-muted [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">Damping</label>
              <span className="text-xs font-mono text-foreground">{config.damping}</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="1"
              value={config.damping}
              onChange={(e) => {
                setConfig({ ...config, damping: Number(e.target.value) })
                triggerSpring()
              }}
              className="mt-1 h-1.5 w-full appearance-none rounded-full bg-muted [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">Mass</label>
              <span className="text-xs font-mono text-foreground">{config.mass}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={config.mass}
              onChange={(e) => {
                setConfig({ ...config, mass: Number(e.target.value) })
                triggerSpring()
              }}
              className="mt-1 h-1.5 w-full appearance-none rounded-full bg-muted [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
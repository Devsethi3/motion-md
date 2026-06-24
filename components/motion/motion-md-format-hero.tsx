"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { ClipboardIcon } from "@hugeicons/core-free-icons"

export function MotionMdFormatHero() {
  return (
    <section className="relative pb-8">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1">
          <HugeiconsIcon
            key="icon"
            icon={ClipboardIcon}
            className="inline-block size-5 shrink-0 translate-y-px fill-accent! align-middle dark:fill-accent-foreground/10!"
          />
          <span className="text-xl">Motion.md Format Specification</span>
        </div>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          A markdown specification for describing a brand&rsquo;s motion
          system. Drop it in your project and tell your AI agent to read it
          before writing animation code - consistent motion, zero repeated
          prompts.
        </p>
      </div>
    </section>
  )
}
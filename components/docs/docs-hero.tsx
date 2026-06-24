"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { File02Icon } from "@hugeicons/core-free-icons"

export function DocsHero() {
  return (
    <section className="relative pb-8">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2">
          <div className="rounded-lg border bg-muted/50 p-1.5">
            <HugeiconsIcon
              icon={File02Icon}
              className="size-5 fill-accent dark:fill-accent-foreground/20"
            />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            Documentation
          </span>
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Everything you need to get started with motion-kit — from installing
          the CLI to integrating MOTION.md files with your AI agent of choice.
          Browse, copy, and drop motion systems into your project in minutes.
        </p>
      </div>
    </section>
  )
}
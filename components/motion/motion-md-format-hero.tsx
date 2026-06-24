"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { ClipboardIcon } from "@hugeicons/core-free-icons"
import { Source, SourceContent, SourceTrigger } from "../ui/source"
import { InlineTool } from "../ui/inline-tool"
import { useTheme } from "next-themes"

export function MotionMdFormatHero() {
  const { resolvedTheme } = useTheme()

  return (
    <section className="relative pb-8">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2">
            <HugeiconsIcon
              icon={ClipboardIcon}
              className="size-5 fill-accent dark:fill-accent-foreground/20"
            />
          <span className="text-xl">
            MOTION.md Format Specification
          </span>
        </div>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          A human-and-AI-readable markdown specification for describing a
          brand&rsquo;s motion system — durations, easings, keyframes, hover
          states, scroll reveals, and transitions. Drop a single file into your
          project, tell your agent to read it before writing animation code, and
          get consistent, on-brand motion across every tool in your stack.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Works with</span>
          <InlineTool
            src={
              resolvedTheme === "dark"
                ? "/cursor_dark.svg"
                : "/cursor_light.svg"
            }
            alt="Cursor"
            size={12}
            label="Cursor"
          />
          <InlineTool src="/claude.svg" alt="Claude" size={14} label="Claude" />
          <InlineTool
            src={
              resolvedTheme === "dark"
                ? "/codex_dark.svg"
                : "/codex_light.svg"
            }
            alt="Codex"
            size={14}
            label="Codex"
          />
          <InlineTool src="/lovable.svg" alt="Lovable" size={12} label="Lovable" />
          {", "}Windsurf, v0, and more.
        </div>

        <p className="mt-4 inline-flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          Inspired by real, publicly observable patterns from{" "}
          <Source href="https://www.figma.com">
            <SourceTrigger showFavicon />
            <SourceContent
              title="Figma"
              description="Figma is the leading collaborative design tool for building meaningful products. Seamlessly design, prototype, develop, and collect feedback in a single platform."
            />
          </Source>
          {", "}
          <Source href="https://contralabs.com/">
            <SourceTrigger showFavicon />
            <SourceContent
              title="Contralabs"
              description="Contralabs is a company focused on creating innovative solutions for the future."
            />
          </Source>
          {", "}
          <Source href="https://apple.com/">
            <SourceTrigger showFavicon />
            <SourceContent
              title="Apple"
              description="Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide."
            />
          </Source>
          {", and dozens more."}
        </p>
      </div>
    </section>
  )
}
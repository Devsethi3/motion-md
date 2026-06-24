"use client"

import { MotionMdFormatSection } from "@/components/motion/motion-md-format-section"
import { MotionMdFormatCodeDisplay } from "@/components/motion/motion-md-format-code-display"
import { CopyButton } from "@/components/copy-button"
import { InlineTool } from "@/components/ui/inline-tool"
import { useTheme } from "next-themes"
import { HugeiconsIcon } from "@hugeicons/react"
import { ClipboardIcon, GithubIcon } from "@hugeicons/core-free-icons"
import { Source, SourceContent, SourceTrigger } from "@/components/ui/source"
import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block"
import Link from "next/link"

export function DocsArticle() {
  const { resolvedTheme } = useTheme()

  return (
    <article className="min-w-0">
      {/* 1. Getting started */}
      <MotionMdFormatSection id="getting-started" title="Getting started">
        <p className="text-base leading-relaxed text-foreground/85">
          motion-kit is a curated collection of MOTION.md files —
          reverse-engineered motion systems from leading product websites like{" "}
          <Source href="https://www.figma.com">
            <SourceTrigger showFavicon />
            <SourceContent
              title="Figma"
              description="Figma is the leading collaborative design tool for building meaningful products."
            />
          </Source>
          ,{" "}
          <Source href="https://clerk.com">
            <SourceTrigger showFavicon />
            <SourceContent
              title="Clerk"
              description="Clerk is a complete suite of embeddable UIs, flexible APIs, and admin dashboards to authenticate and manage users."
            />
          </Source>
          ,{" "}
          <Source href="https://railway.app">
            <SourceTrigger showFavicon />
            <SourceContent
              title="Railway"
              description="Railway is a deployment platform that makes it easy to ship applications with infrastructure provisioning."
            />
          </Source>
          , and dozens more. Each file describes a brand&rsquo;s animation
          language — durations, easings, keyframes, hover states, scroll
          reveals, and transitions — in a format that both humans and AI agents
          can read.
        </p>

        <p className="text-base leading-relaxed text-foreground/85">
          The goal is simple: instead of writing 40 lines of prompt every time
          you want on-brand animations, drop a MOTION.md file into your project
          and tell your agent to read it. Consistent motion, zero repeated
          prompts.
        </p>
      </MotionMdFormatSection>

      {/* 2. Installation */}
      <MotionMdFormatSection id="installation" title="Installation">
        <p className="text-base leading-relaxed text-foreground/85">
          You can use motion-kit in two ways: via the CLI (recommended) or by
          manually copying files from the website.
        </p>

        <h3
          id="cli-usage"
          className="mt-6 !mb-1 scroll-mt-24 text-base font-medium tracking-tight text-foreground lg:text-lg"
        >
          CLI usage
        </h3>
        <p className="text-base leading-relaxed text-foreground/85">
          The fastest way to add a motion system to your project is with the
          motion-kit CLI. It downloads the MOTION.md file and places it in your
          project root, ready for your AI agent to reference.
        </p>

        <div className="not-prose mb-4 rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
            <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Terminal
            </span>
            <CopyButton
              text="npx motion-kit@latest add figma"
              className="h-8 px-2 text-xs"
            >
              Copy
            </CopyButton>
          </div>
          <CodeBlock className="border-0 rounded-t-none">
            <CodeBlockCode
              code="npx motion-kit@latest add figma"
              language="bash"
            />
          </CodeBlock>
        </div>

        <p className="text-base leading-relaxed text-foreground/85">
          Replace <code className="text-sm">figma</code> with any available
          motion system name. The CLI will:
        </p>

        <ol className="space-y-1 text-base leading-relaxed text-foreground/85">
          <li>
            1. Fetch the latest MOTION.md file for that brand from the
            collection.
          </li>
          <li>
            2. Save it as <code className="text-sm">MOTION.md</code> in your
            project root.
          </li>
          <li>
            3. Print a confirmation with instructions for your AI agent.
          </li>
        </ol>

        <h3
          id="manual-setup"
          className="mt-6 !mb-1 scroll-mt-24 text-base font-medium tracking-tight text-foreground lg:text-lg"
        >
          Manual setup
        </h3>
        <p className="text-base leading-relaxed text-foreground/85">
          Prefer to do it yourself? Browse the collection on the homepage, open
          any motion system, and copy the MOTION.md content directly. Paste it
          into a file named <code className="text-sm">MOTION.md</code> in your
          project root.
        </p>

        <p className="text-base leading-relaxed text-foreground/85">
          That&rsquo;s it. No config file. No package to install. Just a single
          markdown file.
        </p>
      </MotionMdFormatSection>

      {/* 3. Usage with AI agents */}
      <MotionMdFormatSection
        id="usage"
        title="Usage with AI agents"
      >
        <p className="text-base leading-relaxed text-foreground/85">
          Once the MOTION.md file is in your project root, tell your AI agent to
          read it before writing any animation code. Here&rsquo;s how to set it
          up with the most popular AI coding tools.
        </p>

        <h3
          id="cursor"
          className="mt-6 !mb-1 scroll-mt-24 text-base font-medium tracking-tight text-foreground lg:text-lg"
        >
          Cursor
        </h3>
        <p className="text-base leading-relaxed text-foreground/85">
          Cursor reads project files automatically. Simply include the MOTION.md
          file in your project and reference it in your prompt:
        </p>

        <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
            <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Prompt example
            </span>
            <CopyButton
              text="Build a hero section with animations. Read MOTION.md before writing any animation code — use the durations, easings, and keyframes defined there."
              className="h-8 px-2 text-xs"
            >
              Copy
            </CopyButton>
          </div>
          <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
            <code className="font-mono text-foreground">
              {`Build a hero section with animations. Read MOTION.md before writing any animation code — use the durations, easings, and keyframes defined there.`}
            </code>
          </pre>
        </div>

        <h3
          id="claude-code"
          className="mt-6 !mb-1 scroll-mt-24 text-base font-medium tracking-tight text-foreground lg:text-lg"
        >
          Claude Code
        </h3>
        <p className="text-base leading-relaxed text-foreground/85">
          Claude Code respects project-level instructions. Add a reference to
          the MOTION.md file in your{" "}
          <code className="text-sm">CLAUDE.md</code> or mention it in your
          prompt:
        </p>

        <MotionMdFormatCodeDisplay
          label="CLAUDE.md entry"
          code={`## Animation Reference

Before writing any animation code, read ./MOTION.md for the brand's
motion language — durations, easings, keyframes, and interaction patterns.
All animations must follow the values defined in that file.`}
          copyText={`## Animation Reference

Before writing any animation code, read ./MOTION.md for the brand's
motion language — durations, easings, keyframes, and interaction patterns.
All animations must follow the values defined in that file.`}
        />

        <h3
          id="v0"
          className="mt-6 !mb-1 scroll-mt-24 text-base font-medium tracking-tight text-foreground lg:text-lg"
        >
          v0 by Vercel
        </h3>
        <p className="text-base leading-relaxed text-foreground/85">
          When using v0, paste the MOTION.md content directly in your prompt or
          reference it as context. v0 understands markdown specifications and
          will apply the motion tokens to generated components.
        </p>

        <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
            <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Prompt example
            </span>
            <CopyButton
              text="Create a landing page with the motion system defined in the attached MOTION.md file. Use the duration scale, easing curves, and keyframes specified."
              className="h-8 px-2 text-xs"
            >
              Copy
            </CopyButton>
          </div>
          <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
            <code className="font-mono text-foreground">
              {`Create a landing page with the motion system defined in the attached MOTION.md file. Use the duration scale, easing curves, and keyframes specified.`}
            </code>
          </pre>
        </div>
      </MotionMdFormatSection>

      {/* 4. MOTION.md format */}
      <MotionMdFormatSection
        id="motion-md-format"
        title="MOTION.md format"
      >
        <p className="text-base leading-relaxed text-foreground/85">
          Every MOTION.md file follows a consistent structure. Whether you reach
          for Figma, Linear, or Railway, you always know where to find the
          duration scale, the easing curves, or the button hover states. For a
          full walkthrough of each section, see the{" "}
          <Link
            href="/motion-md-format"
            className="font-medium text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            MOTION.md format specification
          </Link>
          .
        </p>

        <h3
          id="file-structure"
          className="mt-6 !mb-1 scroll-mt-24 text-base font-medium tracking-tight text-foreground lg:text-lg"
        >
          File structure
        </h3>
        <p className="text-base leading-relaxed text-foreground/85">
          A MOTION.md file contains these sections in order:
        </p>

        <ul className="space-y-2 text-base leading-relaxed text-foreground/85">
          <li>
            <span className="font-semibold text-foreground">
              Title and attribution
            </span>{" "}
            — brand name and a blockquote describing the file&rsquo;s purpose.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Design philosophy
            </span>{" "}
            — the &ldquo;why&rdquo; behind the motion, in plain English.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Color & background context
            </span>{" "}
            — the canvas the motion reads against.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Duration scale
            </span>{" "}
            — every timing value with a name and role.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Easing scale
            </span>{" "}
            — every cubic-bezier curve with its use case.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Core keyframes
            </span>{" "}
            — reusable <code className="text-sm">@keyframes</code> blocks.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Component-level motion
            </span>{" "}
            — hover, active, enter/exit for buttons, cards, nav, modals.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Scroll-triggered reveals
            </span>{" "}
            — IntersectionObserver configs and stagger patterns.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Framer Motion equivalents
            </span>{" "}
            — spring configs and motion variants for React teams.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Summary cheat sheet
            </span>{" "}
            — a markdown table of every animation in the file.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Reduced motion
            </span>{" "}
            — the mandatory{" "}
            <code className="text-sm">prefers-reduced-motion</code> block.
          </li>
        </ul>
      </MotionMdFormatSection>

      {/* 5. Customizing */}
      <MotionMdFormatSection id="customizing" title="Customizing a motion file">
        <p className="text-base leading-relaxed text-foreground/85">
          The MOTION.md files in this collection are starting points — not
          final design systems. You are encouraged to tweak, remix, and evolve
          them to match your brand&rsquo;s unique voice.
        </p>

        <p className="text-base leading-relaxed text-foreground/85">
          Here are the most common customizations:
        </p>

        <ul className="space-y-2 text-base leading-relaxed text-foreground/85">
          <li>
            <span className="font-semibold text-foreground">
              Adjust durations
            </span>{" "}
            — speed up or slow down the timing scale to match your brand&rsquo;s
            energy. A fintech app might want slower, more deliberate motion. A
            gaming site might want snappier transitions.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Replace easing curves
            </span>{" "}
            — swap the primary ease-out for a custom cubic-bezier that better
            reflects your brand&rsquo;s personality.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Add your brand colors
            </span>{" "}
            — update the color context block with your actual brand palette so
            the agent can write animations that feel right against your
            background.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Extend component patterns
            </span>{" "}
            — add hover states for your specific UI components. The more
            patterns you document, the better your agent will perform.
          </li>
        </ul>

        <p className="text-base leading-relaxed text-foreground/85">
          Once you&rsquo;ve made your changes, commit the MOTION.md file to
          your repository. It gets versioned, PR&rsquo;d, and discussed — just
          like code.
        </p>
      </MotionMdFormatSection>

      {/* 6. FAQ */}
      <MotionMdFormatSection id="faq" title="FAQ">
        <div className="space-y-6">
          <div>
            <h4 className="text-base font-semibold text-foreground">
              Do I need to install anything?
            </h4>
            <p className="text-base leading-relaxed text-foreground/85">
              No. MOTION.md is a plain markdown file. You can copy it manually
              from the website or use the CLI for convenience. No build tools,
              no plugins, no dependencies.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-foreground">
              Will this work with any AI agent?
            </h4>
            <p className="text-base leading-relaxed text-foreground/85">
              Yes. Any AI agent that can read markdown files can use MOTION.md
              as a reference. We&rsquo;ve tested with{" "}
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
              ,{" "}
              <InlineTool
                src="/claude.svg"
                alt="Claude"
                size={14}
                label="Claude Code"
              />
              , v0,{" "}
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
              , and{" "}
              <InlineTool
                src="/lovable.svg"
                alt="Lovable"
                size={12}
                label="Lovable"
              />
              .
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-foreground">
              Are these official design systems?
            </h4>
            <p className="text-base leading-relaxed text-foreground/85">
              No. These are curated starting points inspired by publicly visible
              animation patterns. They are not official design systems from the
              listed companies. All trademarks belong to their respective
              owners.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-foreground">
              Can I contribute a motion system?
            </h4>
            <p className="text-base leading-relaxed text-foreground/85">
              Absolutely. motion-kit is open source. Submit a pull request on{" "}
              <Link
                href="https://github.com/Devsethi3/motion-md"
                target="_blank"
                className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-2 hover:text-foreground/80"
              >
                <HugeiconsIcon
                  icon={GithubIcon}
                  className="size-4 fill-accent dark:fill-foreground"
                />
                GitHub
              </Link>{" "}
              with a new MOTION.md file following the format specification.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-foreground">
              What if my agent ignores the MOTION.md file?
            </h4>
            <p className="text-base leading-relaxed text-foreground/85">
              Make sure the file is named <code className="text-sm">MOTION.md</code>{" "}
              (uppercase) and placed in your project root. Some agents need an
              explicit instruction like &ldquo;Read MOTION.md before writing any
              animation code.&rdquo; Add this to your CLAUDE.md, .cursorrules,
              or equivalent project-level instructions file.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-foreground">
              Can I use MOTION.md with Tailwind CSS?
            </h4>
            <p className="text-base leading-relaxed text-foreground/85">
              Yes. The keyframes and transitions in MOTION.md can be translated
              to Tailwind&rsquo;s <code className="text-sm">animate-*</code> and{" "}
              <code className="text-sm">transition-*</code> utilities. The
              duration and easing values map directly to Tailwind&rsquo;s
              configuration.
            </p>
          </div>
        </div>
      </MotionMdFormatSection>
    </article>
  )
}
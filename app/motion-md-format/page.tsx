"use client"

import { Header } from "@/components/landing/header"
import { CopyButton } from "@/components/ui/copy-button"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowTurnBackwardIcon,
  ClipboardIcon,
} from "@hugeicons/core-free-icons"
import {
  TableOfContents,
  TableOfContentsMobile,
  type TocItem,
} from "@/components/table-of-contents"
import { useScrollSpy } from "@/hooks/use-table-of-contents"

const tocItems: TocItem[] = [
  { id: "what-is-motion-md", title: "What is MOTION.md?", depth: 2 },
  {
    id: "the-problem",
    title: "The problem: AI animates, but not consistently",
    depth: 2,
  },
  { id: "the-fix", title: "The fix: MOTION.md", depth: 2 },
  { id: "why-markdown", title: "Why markdown?", depth: 2 },
  { id: "why-a-collection", title: "Why a collection?", depth: 2 },
  { id: "what-motion-md-is-not", title: "What MOTION.md is not", depth: 2 },
  { id: "mental-model", title: "Mental model", depth: 2 },
  { id: "structure", title: "The structure of a MOTION.md file", depth: 2 },
  {
    id: "structure-title-attribution",
    title: "1. Title and attribution",
    depth: 3,
  },
  { id: "structure-philosophy", title: "2. Design philosophy", depth: 3 },
  {
    id: "structure-color-context",
    title: "3. Color & background context",
    depth: 3,
  },
  { id: "structure-duration", title: "4. Duration scale", depth: 3 },
  { id: "structure-easing", title: "5. Easing scale", depth: 3 },
  { id: "structure-keyframes", title: "6. Core keyframes", depth: 3 },
  { id: "structure-components", title: "7. Component-level motion", depth: 3 },
  { id: "structure-scroll", title: "8. Scroll-triggered reveals", depth: 3 },
  {
    id: "structure-framer",
    title: "9. Framer Motion / React equivalent",
    depth: 3,
  },
  { id: "structure-cheatsheet", title: "10. Summary cheat sheet", depth: 3 },
  { id: "structure-reduced-motion", title: "11. Reduced motion", depth: 3 },
  { id: "quick-start", title: "Quick start", depth: 2 },
]

const tocIds = tocItems.map((item) => item.id)

export default function MotionMdFormatPage() {
  const activeId = useScrollSpy(tocIds, { rootMargin: "0px 0px -80% 0px" })

  return (
    <div className="mx-auto min-h-screen max-w-7xl overflow-hidden border-x px-4 lg:overflow-visible">
      <Header />

      <div className="relative">
        <FullWidthDivider position="bottom" className="w-full" />
      </div>

      {/* Mobile TOC — sticky at top on small screens */}
      <TableOfContentsMobile
        items={tocItems}
        activeId={activeId}
        title="On this page"
      />

      <div className="py-4 pb-16">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mb-4 w-fit text-foreground/70"
          )}
        >
          <HugeiconsIcon icon={ArrowTurnBackwardIcon} className="size-4" />
          Back to Home
        </Link>

        {/* Hero section */}
        <section className="relative pb-8">
          <div className="max-w-3xl">
            {/* <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Format Specification
            </p> */}
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

        {/* Desktop layout: content + TOC sidebar */}
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
          {/* Article content */}
          <article className="min-w-0">
            {/* 1. What is MOTION.md? */}
            <section id="what-is-motion-md" className="mb-12 scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">
                What is MOTION.md?
              </h2>
              <hr className="!my-4 border-border" />

              <p className="text-base leading-relaxed text-foreground/85">
                The <span>MOTION.md</span> concept is a plain markdown file that
                describes a brand&rsquo;s animation patterns - durations,
                easings, keyframes, hover states, entrance/exit sequences,
                scroll reveals, and transitions - and hands it to an AI agent so
                it can generate consistent motion. No Framer Motion plugin. No
                JSON schema. No Storybook export. Just a markdown file the agent
                reads before it writes a single line of animation code.
              </p>

              <p className="text-base leading-relaxed text-foreground/85">
                We built motion-kit on top of that idea. This site is the web
                app version - you can browse, preview, and copy any MOTION.md
                file without cloning a repository.
              </p>

              <p className="text-base leading-relaxed text-foreground/85">
                Every MOTION.md in this collection is reverse-engineered from
                publicly visible patterns on production websites. These are not
                official design systems from the listed companies - they are
                curated starting points inspired by observable animation
                patterns so AI agents can replicate the <em>feel</em> of a
                brand, not just its colors.
              </p>
            </section>

            {/* 2. The problem */}
            <section id="the-problem" className="mb-12 scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">
                The problem: AI animates, but not consistently
              </h2>
              <hr className="!my-4 border-border" />

              <p className="text-base leading-relaxed text-foreground/85">
                Tell any AI agent to &ldquo;build me a landing page with
                animations&rdquo; and you already know what you&rsquo;ll get. A
                staggered fade-up. A 300ms ease-out. A scale-on-hover for
                buttons. A generic spring bounce. It works. It also looks like
                every other AI-generated site.
              </p>

              <p className="text-base leading-relaxed text-foreground/85">
                The reason is simple. The agent&rsquo;s idea of &ldquo;good
                motion&rdquo; is an average of averages. It has no clue why
                Figma uses a soft 0.25, 1, 0.5, 1 cubic-bezier instead of a
                sharp expo. It doesn&rsquo;t know that Railway keeps all its
                durations under 250ms to feel like a terminal, or that Clerk
                uses a 0.96 scale on press rather than a translateY. Even if it
                did know, cramming all of that into a prompt is borderline
                impossible.
              </p>

              <p className="text-base leading-relaxed text-foreground/85">
                So you end up with two bad options:
              </p>

              <ul className="space-y-2 text-base leading-relaxed text-foreground/85">
                <li>
                  <span className="font-semibold text-foreground">
                    Write 40 lines of prompt every time
                  </span>{" "}
                  (&ldquo;use 0.16, 1, 0.3, 1 for ease-out, 150ms for hover,
                  400ms for entrances, no bounce, tight springs&hellip;&rdquo;)
                  and still get half of it wrong.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Screenshot a site, paste it, say &ldquo;make it move like
                    this.&rdquo;
                  </span>{" "}
                  The agent copies the keyframe names but misses the philosophy
                  behind the easing curve.
                </li>
              </ul>

              <p className="text-base leading-relaxed text-foreground/85">
                Neither scales.
              </p>
            </section>

            {/* 3. The fix */}
            <section id="the-fix" className="mb-12 scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">
                The fix: MOTION.md
              </h2>
              <hr className="!my-4 border-border" />

              <p className="text-base leading-relaxed text-foreground/85">
                A MOTION.md file describes a brand&rsquo;s motion language
                semantically. It is not a CSS dump. Not a Framer Motion export.
                Not a Lottie JSON blob. Picture a document where an experienced
                motion designer explains a brand&rsquo;s animation vocabulary to
                a developer who&rsquo;s writing animations for the first time.
                That&rsquo;s what it reads like.
              </p>

              <p className="text-base leading-relaxed text-foreground/85">
                Here&rsquo;s what goes inside:
              </p>

              <ul className="space-y-2 text-base leading-relaxed text-foreground/85">
                <li>
                  <span className="font-semibold text-foreground">
                    Design philosophy
                  </span>{" "}
                  tells the agent what the brand&rsquo;s motion feels like and,
                  more importantly, why. Sentences like &ldquo;Restraint is the
                  feature - durations are short, transforms are small.&rdquo;
                  The agent gets intent, not just instructions.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Duration scale
                  </span>{" "}
                  gives every timing value a name and a role.{" "}
                  <code className="text-sm">--duration-instant: 60ms</code> for
                  toggle states.{" "}
                  <code className="text-sm">--duration-slow: 500ms</code> for
                  section entrances. The name tells you how fast it goes; the
                  context tells you why.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Easing scale
                  </span>{" "}
                  defines every curve - primary ease-out, sharp entrances,
                  gentle bounce, linear progress. Each one has a use case
                  attached, not just a bezier value.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Core keyframes
                  </span>{" "}
                  - the actual <code className="text-sm">@keyframes</code>{" "}
                  blocks for entrances (fade up, fade in, scale in, slide in)
                  and exits (fade out, slide out). Ready to copy-paste into
                  CSS-in-JS or tailwind-animate.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Component-level motion
                  </span>{" "}
                  - hover states, active states, enter/exit sequences for
                  buttons, cards, nav elements, modals, tabs, carousels. Every
                  interaction documented with its duration, easing, and
                  transform.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Scroll-triggered reveals
                  </span>{" "}
                  - IntersectionObserver thresholds, stagger delays, transition
                  configs for sections entering the viewport.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Reduced motion
                  </span>{" "}
                  - the mandatory{" "}
                  <code className="text-sm">prefers-reduced-motion</code> media
                  query block, because motion accessibility is not optional.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Framer Motion / React equivalents
                  </span>{" "}
                  - spring configs, motion variants, animate-presence wrappers
                  for teams using React animation libraries.
                </li>
              </ul>

              <p className="text-base leading-relaxed text-foreground/85">
                MOTION.md keeps the rule, the code, and the rationale in the
                same file. A duration token tells you how long. A keyframe tells
                you what it does. The philosophy section is what lets an agent
                make the right call when it hits a situation the file never
                covers.
              </p>
            </section>

            {/* 4. Why markdown */}
            <section id="why-markdown" className="mb-12 scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">
                Why markdown?
              </h2>
              <hr className="!my-4 border-border" />

              <p className="text-base leading-relaxed text-foreground/85">
                Because it is the language AI agents speak best. They can read
                JSON tokens but can&rsquo;t interpret why one easing curve is
                chosen over another. They can&rsquo;t open a Framer file. They
                will imitate a motion reference but won&rsquo;t understand the
                physics model behind it. Markdown sits in the middle: readable
                by humans, parseable by machines, easy to version and diff, and
                you can drop it in a project root.
              </p>

              <p className="text-base leading-relaxed text-foreground/85">
                Drop a MOTION.md file in your project root and tell your agent
                &ldquo;use MOTION.md as reference before you write any
                animation.&rdquo; From that point on, whether you&rsquo;re
                working with Claude Code, Cursor, or Windsurf, the agent knows
                which easing curve, which duration, which stagger pattern to
                reach for. You don&rsquo;t have to repeat yourself in every
                prompt.
              </p>
            </section>

            {/* 5. Why a collection */}
            <section id="why-a-collection" className="mb-12 scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">
                Why a collection?
              </h2>
              <hr className="!my-4 border-border" />

              <p className="text-base leading-relaxed text-foreground/85">
                Most teams don&rsquo;t write their own MOTION.md from scratch.
                Most teams say &ldquo;animate it like Linear,&rdquo; &ldquo;give
                it that Vercel feel,&rdquo; or &ldquo;make it move like
                Stripe.&rdquo; These references are real. They come up
                constantly.
              </p>

              <p className="text-base leading-relaxed text-foreground/85">
                motion-kit collects those starting points. Motion files based on
                Figma, Linear, Vercel, Clerk, Railway, Branch, and dozens more,
                all in the same format, all comparable. Pick one, drop it into
                your project, tell your agent &ldquo;use this file as
                reference.&rdquo; Building on top of that language with your own
                transitions and component animations is up to you.
              </p>

              <p className="text-base leading-relaxed text-foreground/85">
                The goal is not &ldquo;copy Figma&rsquo;s animations.&rdquo; It
                is to give the agent a starting language. Enough context to
                escape the generic average and land on a specific motion
                aesthetic. From there you drift, you make it yours, you evolve
                it.
              </p>
            </section>

            {/* 6. What it's not */}
            <section id="what-motion-md-is-not" className="mb-12 scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">
                What MOTION.md is not
              </h2>
              <hr className="!my-4 border-border" />

              <p className="text-base leading-relaxed text-foreground/85">
                The name can be misleading, so this matters:
              </p>

              <ul className="space-y-3 text-base leading-relaxed text-foreground/85">
                <li>
                  <span className="font-semibold text-foreground">
                    You can&rsquo;t drop it in and call the animation done.
                  </span>{" "}
                  It is a dictionary. The implementation still needs writing.
                  There is no compiled code inside, just rules. It describes
                  what a button hover looks like; you or your agent still build
                  the animation.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    It is not a motion design portfolio export.
                  </span>{" "}
                  Motion portfolios are written for humans and speak too loosely
                  for agents to act on (&ldquo;springy and delightful&rdquo;). A
                  MOTION.md has to be specific enough for the agent to write an
                  animation on its next turn.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    It is not a CSS file.
                  </span>{" "}
                  CSS tells you the outcome but not the philosophy. A MOTION.md
                  carries the why alongside the code.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    And it is not static.
                  </span>{" "}
                  When the brand evolves, the file evolves. It gets versioned,
                  PR&rsquo;d, discussed. It behaves like code.
                </li>
              </ul>
            </section>

            {/* 7. Mental model */}
            <section id="mental-model" className="mb-12 scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">
                Mental model
              </h2>
              <hr className="!my-4 border-border" />

              <p className="text-base leading-relaxed text-foreground/85">
                You used to hire a motion designer and say &ldquo;you know
                Figma&rsquo;s interactions, right? Give me that feel.&rdquo; It
                worked because the designer already carried the reference in
                their head. That shared context sat underneath every
                conversation you had with them.
              </p>

              <p className="text-base leading-relaxed text-foreground/85">
                An AI agent doesn&rsquo;t have that shared context. MOTION.md
                writes it into a file and puts it in the agent&rsquo;s
                &ldquo;head.&rdquo; The reference pool you built with a designer
                over years, you set up with an agent in two minutes.
              </p>

              <p className="text-base leading-relaxed text-foreground/85">
                motion-kit is not an &ldquo;animation asset site.&rdquo; It is
                closer to an experiment in how motion languages get shared when
                the &ldquo;designer&rdquo; is an AI. The MOTION.md files are the
                format. The site is a collection that makes that format
                concrete.
              </p>
            </section>

            {/* 8. Structure */}
            <section id="structure" className="mb-12 scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">
                The structure of a MOTION.md file
              </h2>
              <hr className="!my-4 border-border" />

              <p className="text-base leading-relaxed text-foreground/85">
                A MOTION.md file has a consistent, predictable structure. Every
                file in the collection follows the same skeleton so that -
                whether you reach for Figma, Linear, or Railway - you always
                know where to find the duration scale, the easing curves, or the
                button hover states. There are 11 standard pieces, walked
                through below in the order they appear in the file. Each one is
                a layer the agent reaches for when making a specific animation
                decision.
              </p>

              {/* 8.1 */}
              <h3
                id="structure-title-attribution"
                className="mt-8 !mb-1 scroll-mt-24 text-lg font-medium tracking-tight text-foreground"
              >
                1. Title and attribution
              </h3>
              <p className="text-base leading-relaxed text-foreground/85">
                The very top of the file is a markdown heading with the brand
                name, followed by a blockquote attribution that tells the reader
                (and the agent) exactly what this file is.
              </p>

              <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    MOTION.md header
                  </span>
                  <CopyButton
                    text={`# MOTION.md — figma.com Motion System\n> Reverse-engineered from figma.com (2026)\n> Drop into Cursor, Claude Code, v0, Lovable, or Codex for on-brand animations.`}
                    label="Copy"
                    copiedLabel="Copied!"
                    className="h-8 px-2 text-xs"
                  />
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                  <code className="font-mono text-foreground">{`# MOTION.md — figma.com Motion System
> Reverse-engineered from figma.com (2026)
> Drop into Cursor, Claude Code, v0, Lovable, or Codex for on-brand animations.`}</code>
                </pre>
              </div>

              <p className="text-base leading-relaxed text-foreground/85">
                The attribution block is what tells downstream tools what this
                file is for. It&rsquo;s not metadata - it&rsquo;s context the
                agent reads before it writes a single line of animation code.
              </p>

              {/* 8.2 */}
              <h3
                id="structure-philosophy"
                className="mt-8 !mb-1 scroll-mt-24 text-lg font-medium tracking-tight text-foreground"
              >
                2. Design philosophy
              </h3>
              <p className="text-base leading-relaxed text-foreground/85">
                This is the atmosphere statement - the brand&rsquo;s motion
                philosophy in plain English. What carries the voltage? What role
                does speed play? What does the timing communicate? It closes
                with a bullet list of core principles.
              </p>

              <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Philosophy block
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                  <code className="font-mono text-foreground">{`## Design Philosophy

Figma's motion is **light, airy, and deceptively simple**. It's a white-background
product that uses motion the same way a good designer uses whitespace — intentionally
and sparingly. Nothing fights for attention. Every animation defers to content.

Core principles:
- **White-first** — all motion reads against white or near-white.
- **Restraint is the feature** — durations are short, transforms are small.
- **Horizontal slide transitions** — tab/product switching slides left/right.
- **Color transitions carry weight** — hover states shift background fill, not opacity.`}</code>
                </pre>
              </div>

              <p className="text-base leading-relaxed text-foreground/85">
                This section answers &ldquo;why does it move like this?&rdquo;
                The rest of the file answers &ldquo;what are the exact
                values?&rdquo; This one answers &ldquo;why.&rdquo; Without it,
                the agent has the specs but not the intent.
              </p>

              {/* 8.3 */}
              <h3
                id="structure-color-context"
                className="mt-8 !mb-1 scroll-mt-24 text-lg font-medium tracking-tight text-foreground"
              >
                3. Color & background context
              </h3>
              <p className="text-base leading-relaxed text-foreground/85">
                Motion reads against a background. The same fade-up animation
                behaves differently on white versus near-black. This block
                documents the canvas color, surface colors, border colors, text
                colors, and brand accent colors so the agent can write
                animations that feel right against the brand&rsquo;s background.
              </p>

              <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Color context
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                  <code className="font-mono text-foreground">{`## Color & Background Context

\`\`\`
Background:           #FFFFFF   (pure white)
Surface:              #F5F5F5   (light grey cards)
Surface hover:        #EBEBEB   (pressed/hover state)
Text primary:         #1A1A1A   (near-black)
Brand purple:         #7B61FF   (primary CTA, highlights)

Motion reads on white. Shadows are the primary depth signal, not borders or
color fills. Everything is gentle — no jarring contrast shifts.
\`\`\``}</code>
                </pre>
              </div>

              {/* 8.4 */}
              <h3
                id="structure-duration"
                className="mt-8 !mb-1 scroll-mt-24 text-lg font-medium tracking-tight text-foreground"
              >
                4. Duration scale
              </h3>
              <p className="text-base leading-relaxed text-foreground/85">
                Every timing value in the system gets a name and a role.
                Durations are expressed as CSS custom properties (
                <code className="text-sm">--duration-*</code>) with comments
                explaining where each one applies. The naming is semantic -{" "}
                <code className="text-sm">fast</code>,{" "}
                <code className="text-sm">base</code>,{" "}
                <code className="text-sm">slow</code> - not arbitrary numbers.
              </p>

              <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Duration scale
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                  <code className="font-mono text-foreground">{`## Duration Scale

\`\`\`css
--duration-instant:   60ms;    /* toggle states, checkbox ticks */
--duration-micro:     100ms;   /* icon swaps, badge updates */
--duration-fast:      160ms;   /* hover color transitions */
--duration-base:      240ms;   /* standard UI transitions */
--duration-medium:    360ms;   /* card reveals, dropdown opens */
--duration-slow:      500ms;   /* section entrances, hero content */
--duration-slower:    700ms;   /* hero carousel transitions */
\`\`\``}</code>
                </pre>
              </div>

              {/* 8.5 */}
              <h3
                id="structure-easing"
                className="mt-8 !mb-1 scroll-mt-24 text-lg font-medium tracking-tight text-foreground"
              >
                5. Easing scale
              </h3>
              <p className="text-base leading-relaxed text-foreground/85">
                The easing curves are the most important part of a motion
                system. Two brands can use the same duration but feel completely
                different because of the curve. This block documents every
                cubic-bezier with its role and a one-line explanation of when to
                use it.
              </p>

              <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Easing scale
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                  <code className="font-mono text-foreground">{`## Easing Scale

\`\`\`css
/* Primary — smooth deceleration, used everywhere */
--ease-out:         cubic-bezier(0.25, 1, 0.5, 1);

/* Snappy — quick interactions, hover states */
--ease-out-sharp:   cubic-bezier(0.16, 1, 0.3, 1);

/* In-out — tab switches, carousel slides */
--ease-in-out:      cubic-bezier(0.4, 0, 0.2, 1);

/* Gentle bounce — CTA buttons, pill tags */
--ease-out-back:    cubic-bezier(0.34, 1.2, 0.64, 1);
\`\`\`

**Primary easing is always --ease-out.** This matches the feeling of
polished product motion — smooth deceleration, no overshoot.`}</code>
                </pre>
              </div>

              {/* 8.6 */}
              <h3
                id="structure-keyframes"
                className="mt-8 !mb-1 scroll-mt-24 text-lg font-medium tracking-tight text-foreground"
              >
                6. Core keyframes
              </h3>
              <p className="text-base leading-relaxed text-foreground/85">
                The actual <code className="text-sm">@keyframes</code> blocks.
                Every MOTION.md defines a consistent set of entrance keyframes
                (fade up, fade down, fade in, slide in left/right, scale in) and
                exit keyframes (fade out, slide out). These are the reusable
                building blocks that component-level animations reference.
              </p>

              <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Core keyframes
                  </span>
                  <CopyButton
                    text={`@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}`}
                    label="Copy keyframes"
                    copiedLabel="Copied!"
                    className="h-8 px-2 text-xs"
                  />
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                  <code className="font-mono text-foreground">{`@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}`}</code>
                </pre>
              </div>

              {/* 8.7 */}
              <h3
                id="structure-components"
                className="mt-8 !mb-1 scroll-mt-24 text-lg font-medium tracking-tight text-foreground"
              >
                7. Component-level motion
              </h3>
              <p className="text-base leading-relaxed text-foreground/85">
                This is where the keyframes compose into real UI interactions.
                Each component - buttons, navigation, cards, tabs, carousels,
                modals - gets its own annotated section with the exact CSS
                transitions, hover states, active states, and enter/exit
                sequences.
              </p>

              <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Component motion - Buttons
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                  <code className="font-mono text-foreground">{`## Buttons

### Primary CTA
\`\`\`css
.btn-primary {
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
}
\`\`\``}</code>
                </pre>
              </div>

              {/* 8.8 */}
              <h3
                id="structure-scroll"
                className="mt-8 !mb-1 scroll-mt-24 text-lg font-medium tracking-tight text-foreground"
              >
                8. Scroll-triggered section reveals
              </h3>
              <p className="text-base leading-relaxed text-foreground/85">
                Defines how sections, feature grids, and content blocks enter as
                the user scrolls. Includes the IntersectionObserver threshold,
                the transition configuration, and the stagger delay pattern for
                multi-child reveals.
              </p>

              <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Scroll reveals
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                  <code className="font-mono text-foreground">{`## Scroll-Triggered Section Reveals

\`\`\`css
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity   500ms var(--ease-out),
    transform 500ms var(--ease-out);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children */
.grid-item.visible:nth-child(1) { transition-delay: 0ms; }
.grid-item.visible:nth-child(2) { transition-delay: 60ms; }
.grid-item.visible:nth-child(3) { transition-delay: 120ms; }
\`\`\`

\`\`\`js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12 }
)
\`\`\``}</code>
                </pre>
              </div>

              {/* 8.9 */}
              <h3
                id="structure-framer"
                className="mt-8 !mb-1 scroll-mt-24 text-lg font-medium tracking-tight text-foreground"
              >
                9. Framer Motion / React equivalent
              </h3>
              <p className="text-base leading-relaxed text-foreground/85">
                For teams using React animation libraries, every MOTION.md
                includes a Framer Motion section that translates the CSS
                keyframes and transitions into motion variants, spring configs,
                and AnimatePresence wrappers.
              </p>

              <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Framer Motion equivalent
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                  <code className="font-mono text-foreground">{`## Framer Motion Equivalent (if using React)

\`\`\`js
// Primary spring — tight, no bounce
const springConfig = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8,
}

// Fade up variant
const fadeUpVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
}

// Stagger container
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}
\`\`\``}</code>
                </pre>
              </div>

              {/* 8.10 */}
              <h3
                id="structure-cheatsheet"
                className="mt-8 !mb-1 scroll-mt-24 text-lg font-medium tracking-tight text-foreground"
              >
                10. Summary cheat sheet
              </h3>
              <p className="text-base leading-relaxed text-foreground/85">
                Every MOTION.md ends with a markdown table that summarizes every
                documented animation in a single view: element, duration, easing
                curve, and transform. This is the single-page reference the
                agent (or a human) can scan in seconds.
              </p>

              <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Cheat sheet table
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                  <code className="font-mono text-foreground">{`## Summary Cheat Sheet

| Element              | Duration  | Easing                        | Transform              |
|----------------------|-----------|-------------------------------|------------------------|
| Nav hover            | 150ms     | linear                        | opacity only           |
| Button hover         | 150ms     | cubic-bezier(0.16, 1, 0.3, 1) | opacity                |
| Button active        | 80ms      | cubic-bezier(0.16, 1, 0.3, 1) | scale(0.94)            |
| Badge entrance       | 300ms     | cubic-bezier(0.16, 1, 0.3, 1) | scale(0.9→1)           |
| Hero word stagger    | 600ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(12px→0)     |
| Section reveal       | 500ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(16px→0)     |
| Tab panel enter      | 250ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(12px→0)     |
| Screenshot           | 600ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(20px)+scale |
| Stagger delay step   | +80ms     | —                             | per child              |`}</code>
                </pre>
              </div>

              {/* 8.11 */}
              <h3
                id="structure-reduced-motion"
                className="mt-8 !mb-1 scroll-mt-24 text-lg font-medium tracking-tight text-foreground"
              >
                11. Reduced motion
              </h3>
              <p className="text-base leading-relaxed text-foreground/85">
                Every MOTION.md includes the mandatory{" "}
                <code className="text-sm">prefers-reduced-motion</code> block.
                Motion accessibility is not optional - and the agent needs to
                know the pattern exists.
              </p>

              <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Reduced motion
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                  <code className="font-mono text-foreground">{`## Reduced Motion

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\``}</code>
                </pre>
              </div>
            </section>

            {/* 9. Quick start */}
            <section id="quick-start" className="mb-12 scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">
                Quick start
              </h2>
              <hr className="!my-4 border-border" />

              <div className="not-prose mb-6 rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Terminal
                  </span>
                  <CopyButton
                    text="npx motion-kit@latest add figma"
                    label="Copy"
                    copiedLabel="Copied!"
                    className="h-8 px-2 text-xs"
                  />
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                  <code className="font-mono text-foreground">
                    npx motion-kit@latest add figma
                  </code>
                </pre>
              </div>

              <ol className="space-y-2 text-base leading-relaxed text-foreground/85">
                <li>
                  <span className="font-semibold text-foreground">Browse</span>{" "}
                  the collection and find a motion system that matches the brand
                  energy you want.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Copy</span>{" "}
                  the MOTION.md content (or use the CLI) and drop it into your
                  project root.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Tell your agent
                  </span>
                  : &ldquo;Read MOTION.md before writing any animation
                  code.&rdquo;
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    That&rsquo;s it.
                  </span>{" "}
                  Every animation the agent generates will match the
                  brand&rsquo;s motion language - durations, easings, keyframes,
                  interaction patterns.
                </li>
              </ol>

              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                <em>
                  These are not official design systems from the listed
                  companies. They are curated starting points inspired by
                  publicly visible animation patterns. All trademarks, brand
                  names, and design elements belong to their respective owners.
                  These MOTION.md files document publicly observable motion
                  patterns for educational and development purposes.
                </em>
              </p>
            </section>
          </article>

          {/* Desktop TOC sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <TableOfContents items={tocItems} activeId={activeId} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

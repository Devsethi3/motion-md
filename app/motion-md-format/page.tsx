"use client"

import { Header } from "@/components/landing/header"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowTurnBackwardIcon } from "@hugeicons/core-free-icons"
import {
  TableOfContents,
  TableOfContentsMobile,
  type TocItem,
} from "@/components/table-of-contents"
import { useScrollSpy } from "@/hooks/use-table-of-contents"
import { MotionMdFormatHero } from "@/components/motion/motion-md-format-hero"
import { MotionMdFormatArticle } from "@/components/motion/motion-md-format-article"

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
  { id: "structure-philosophy", title: "1. Design philosophy", depth: 3 },
  {
    id: "structure-color-context",
    title: "2. Color & background context",
    depth: 3,
  },
  { id: "structure-duration", title: "3. Duration scale", depth: 3 },
  { id: "structure-easing", title: "4. Easing scale", depth: 3 },
  { id: "structure-keyframes", title: "5. Core keyframes", depth: 3 },
  { id: "structure-components", title: "6. Component-level motion", depth: 3 },
  { id: "structure-scroll", title: "7. Scroll-triggered reveals", depth: 3 },
  {
    id: "structure-framer",
    title: "8. Framer Motion / React equivalent",
    depth: 3,
  },
]

const tocIds = tocItems.map((item) => item.id)

export default function MotionMdFormatPage() {
  const activeId = useScrollSpy(tocIds, { rootMargin: "0px 0px -80% 0px" })

  return (
    <div className="mx-auto min-h-screen max-w-7xl border-x px-4">
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

        <MotionMdFormatHero />

        {/* Desktop layout: content + TOC sidebar */}
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
          <MotionMdFormatArticle />

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
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
import { DocsHero } from "@/components/docs/docs-hero"
import { DocsArticle } from "@/components/docs/docs-article"

const tocItems: TocItem[] = [
  { id: "getting-started", title: "Getting started", depth: 2 },
  { id: "installation", title: "Installation", depth: 2 },
  { id: "cli-usage", title: "CLI usage", depth: 3 },
  { id: "manual-setup", title: "Manual setup", depth: 3 },
  { id: "usage", title: "Usage with AI agents", depth: 2 },
  { id: "cursor", title: "Cursor", depth: 3 },
  { id: "claude-code", title: "Claude Code", depth: 3 },
  { id: "v0", title: "v0 by Vercel", depth: 3 },
  { id: "motion-md-format", title: "MOTION.md format", depth: 2 },
  { id: "file-structure", title: "File structure", depth: 3 },
  { id: "customizing", title: "Customizing a motion file", depth: 2 },
  { id: "faq", title: "FAQ", depth: 2 },
]

const tocIds = tocItems.map((item) => item.id)

export default function DocsPage() {
  const activeId = useScrollSpy(tocIds, { rootMargin: "0px 0px -80% 0px" })

  return (
    <div className="mx-auto min-h-screen max-w-7xl border-x px-4">
      <Header />

      <div className="relative">
        <FullWidthDivider position="bottom" className="w-full" />
      </div>

      {/* Mobile TOC */}
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

        <DocsHero />

        {/* Desktop layout: content + TOC sidebar */}
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
          <DocsArticle />

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
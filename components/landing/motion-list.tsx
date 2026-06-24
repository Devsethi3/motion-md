"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { BorderCross } from "../ui/border-cross"
import { FullWidthDivider } from "../ui/full-width-divider"
import {
  SearchIcon,
  Bookmark02Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons"
import { useTheme } from "next-themes"
import Link from "next/link"
import { motions } from "@/lib/motions"

type Category = {
  label: string
  count: number
}

const categories: Category[] = [
  { label: "All", count: 75 },
  { label: "AI & LLM Platforms", count: 12 },
  { label: "Developer Tools & IDEs", count: 7 },
  { label: "Backend, Database & DevOps", count: 9 },
  { label: "Productivity & SaaS", count: 7 },
  { label: "Design & Creative Tools", count: 6 },
  { label: "Fintech & Crypto", count: 7 },
  { label: "E-commerce & Retail", count: 5 },
  { label: "Media & Consumer Tech", count: 14 },
  { label: "Automotive", count: 7 },
]

const MotionList = () => {
  const { resolvedTheme } = useTheme()

  return (
    <div>
      <div className="relative">
        <FullWidthDivider position="bottom" className="w-full" />
        <BorderCross className="bottom-0 -left-4 -translate-x-1/2 translate-y-1/2" />
        <BorderCross className="-right-4 bottom-0 translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="mx-auto my-20 w-full max-w-7xl lg:px-4 px-0">
        <main className="flex w-full flex-col py-8">
          {/* Search bar */}
          <div className="flex w-full items-center gap-2.5 border-b bg-background/80 pb-3 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
            <HugeiconsIcon
              icon={SearchIcon}
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground"
            />
            <input
              placeholder="Search all designs"
              type="text"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
            <span className="shrink-0 text-xs text-muted-foreground/60 tabular-nums">
              {motions.length} results
            </span>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <colgroup>
                <col className="w-8" />
                <col className="w-32 sm:w-40" />
                <col className="min-w-[200px]" />
                <col className="hidden w-20 lg:table-column" />
                <col className="w-20 sm:w-24" />
              </colgroup>
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground/70">
                  <th className="py-3 pr-4 font-medium">#</th>
                  <th className="py-3 pr-6 font-medium">Name</th>
                  <th className="py-3 pr-6 font-medium">Description</th>
                  <th className="hidden py-3 pr-4 text-right font-medium lg:table-cell">
                    Installs
                  </th>
                  <th className="py-3 text-right font-medium">
                    <span className="inline-flex items-center justify-end gap-1">
                      Bookmarked
                      <HugeiconsIcon
                        icon={ArrowDown01Icon}
                        aria-hidden="true"
                        className="size-3"
                      />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {motions.map((motion, index) => (
                  // `contents` keeps Link out of the table's box layout —
                  // a <tr> can only be a direct child of <tbody>, so an <a>
                  // wrapper here would otherwise break column sizing.
                  <Link
                    key={motion.slug}
                    href={`/${motion.slug}/motion-md`}
                    className="contents"
                  >
                    <tr className="group border-b border-border/50 transition-colors hover:bg-secondary/30 cursor-pointer">
                      {/* Row number */}
                      <td className="py-3.5 pr-4 align-middle">
                        <span className="text-xs text-muted-foreground/40 tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </td>

                      {/* Name + monogram */}
                      <td className="py-3.5 pr-6 align-middle">
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded border bg-background transition-colors group-hover:border-foreground/20">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={
                                resolvedTheme === "dark"
                                  ? motion.logoDark
                                  : motion.logoLight
                              }
                              alt={motion.name}
                              width={16}
                              height={16}
                              className="size-4 rounded"
                            />
                          </span>
                          <span className="font-medium whitespace-nowrap text-foreground">
                            {motion.name}
                          </span>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="py-3.5 pr-6 align-middle">
                        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {motion.description}
                        </p>
                      </td>

                      {/* Installs */}
                      <td className="hidden py-3.5 pr-4 text-right align-middle text-muted-foreground tabular-nums lg:table-cell">
                        {motion.installs}
                      </td>

                      {/* Bookmarks */}
                      <td className="py-3.5 text-right align-middle">
                        <span className="inline-flex items-center justify-end gap-1.5 text-muted-foreground tabular-nums">
                          <HugeiconsIcon
                            icon={Bookmark02Icon}
                            aria-hidden="true"
                            className="size-3.5 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground"
                          />
                          {motion.bookmarks}
                        </span>
                      </td>
                    </tr>
                  </Link>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MotionList
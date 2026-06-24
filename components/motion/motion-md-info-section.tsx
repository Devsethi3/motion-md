import Image from "next/image"
import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Bookmark01Icon, Download02Icon } from "@hugeicons/core-free-icons"
import { CopyButton } from "@/components/copy-button"
import type { Motion } from "@/lib/motions"

export function MotionMdInfoSection({ motion }: { motion: Motion }) {
  return (
    <>
      <section className="relative pb-6">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-background">
            <Image
              src={motion.logoLight}
              alt={`${motion.name} logo`}
              width={48}
              height={48}
              className="size-10 rounded-md p-2 dark:hidden"
            />
            <Image
              src={motion.logoDark || motion.logoLight}
              alt={`${motion.name} logo`}
              width={48}
              height={48}
              className="hidden size-10 rounded-md p-2 dark:block"
            />
          </div>

          <div className="min-w-0">
            <h1 className="text-lg tracking-tight text-foreground">
              {motion.name}
            </h1>
            <p className="-mt-1 text-sm leading-6 text-muted-foreground">
              {motion.description}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_520px]">
        {/* LEFT */}
        <div>
          <div className="mb-4">
            <div className="rounded-xl border bg-muted/50">
              <div className="flex items-center justify-between border-b border-border px-4 py-2">
                <span className="text-xs text-muted-foreground">
                  Run this command from your project root, then ask your AI
                  assistant to use Motion.md for UI work.
                </span>
              </div>
              <div className="relative p-4">
                <CodeBlock className="">
                  <CodeBlockCode
                    code="npx motion-md@latest add figma"
                    language="bash"
                  />
                </CodeBlock>
                <CopyButton
                  className="absolute top-7 right-7"
                  variant="ghost"
                  size="icon"
                  text="Text 1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between rounded-lg border bg-muted px-4 py-3">
              <div className="text-xs uppercase">Installs</div>
              <div className="text-sm">{motion.installs}</div>
            </div>

            <div className="flex items-center justify-between rounded-lg border bg-muted px-4 py-3">
              <div className="text-xs uppercase">Bookmarked</div>
              <div className="text-sm">{motion.bookmarks}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg">
              <HugeiconsIcon
                icon={Bookmark01Icon}
                className="size-4 fill-accent dark:fill-accent-foreground/20"
              />{" "}
              SAVE
            </Button>

            <Button variant="outline" size="lg">
              <HugeiconsIcon icon={Download02Icon} className="size-4" />{" "}
              Download MOTION.md
            </Button>
          </div>
          <div className="my-2 flex gap-1 text-xs leading-relaxed text-muted-foreground">
            <span className="mt-[1px]">✦</span>

            <p>
              Independent analysis of publicly observable patterns, curated as
              a starting point for inspiration. Not affiliated with or
              endorsed by Figma
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
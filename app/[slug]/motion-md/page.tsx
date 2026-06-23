import { cache } from "react"
import { promises as fs } from "fs"
import path from "path"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowTurnBackwardIcon } from "@hugeicons/core-free-icons"

import { getMotionBySlug } from "@/lib/motions"
import { BorderCross } from "@/components/ui/border-cross"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { Header } from "@/components/landing/header"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CopyButton } from "@/components/ui/copy-button"
import { MarkdownContent } from "@/components/markdown/markdown-content"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/motion/tabs"
import { RaisedButton } from "@/components/ui/raised-button"

export async function generateStaticParams() {
  const { motions } = await import("@/lib/motions")

  return motions.map((motion) => ({
    slug: motion.slug,
  }))
}

const getMotionMdContent = cache(async (motionDir: string) => {
  const filePath = path.join(process.cwd(), "motion", motionDir, "motion.md")

  try {
    return await fs.readFile(filePath, "utf8")
  } catch {
    return null
  }
})

export default async function MotionMdPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const motion = getMotionBySlug(slug)

  if (!motion) {
    notFound()
  }

  const content = await getMotionMdContent(motion.motionDir)

  return (
    <div className="mx-auto min-h-screen max-w-7xl overflow-hidden border-x px-4 lg:overflow-visible">
      <Header />

      <div className="relative">
        <FullWidthDivider position="bottom" className="w-full" />
        <BorderCross className="bottom-0 -left-4 -translate-x-1/2 translate-y-1/2" />
        <BorderCross className="-right-4 bottom-0 translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="py-4 pb-10">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "link" }), "mb-4 w-fit")}
        >
          <HugeiconsIcon icon={ArrowTurnBackwardIcon} className="size-4" />
          Back to Home
        </Link>

        <section className="border-b border-border/70 pb-6">
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

        <Tabs defaultValue="markdown" className="mt-8" variant="segment">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <div className="flex flex-wrap items-center gap-2">
              <RaisedButton>llm.txt</RaisedButton>
              <RaisedButton>Save</RaisedButton>
              <RaisedButton>Download MOTION.md</RaisedButton>
            </div>
          </div>

          <TabsContent value="markdown" className="relative mt-6">
            <section className="overflow-hidden rounded-2xl border bg-muted/50 shadow-md before:absolute before:inset-0 before:border-t before:border-white/40 before:bg-gradient-to-b before:from-white/20 before:to-transparent">
              <div className="m-2 rounded-xl border bg-background">
                <div className="border-b border-border/70 px-4 py-3 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        MOTION.md
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Structured motion system reference for {motion.name}
                      </p>
                    </div>
                    {content ? (
                      <CopyButton
                        text={content}
                        label="Copy MOTION.md"
                        copiedLabel="Copied"
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      />
                    ) : null}
                  </div>
                </div>

                {content ? (
                  <div className="px-4 py-3 sm:px-6">
                    will add soon
                    {/* {content} */}
                  </div>
                ) : (
                  <div className="px-4 py-12 sm:px-6">
                    <p className="text-sm text-muted-foreground">
                      Motion details for {motion.name} will be coming soon!
                    </p>
                  </div>
                )}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            Will add soon!
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

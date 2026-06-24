import { cache } from "react"
import { promises as fs } from "fs"
import path from "path"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  AlertCircleIcon,
  ArrowTurnBackwardIcon,
  GithubIcon,
  Share08Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons"
import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CopyIcon,
  Bookmark01Icon,
  Download02Icon,
  BoxIcon,
  CubeIcon,
} from "@hugeicons/core-free-icons"

import { getMotionBySlug } from "@/lib/motions"
import { BorderCross } from "@/components/ui/border-cross"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { Header } from "@/components/landing/header"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CopyButton } from "@/components/ui/copy-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
        <div className="flex items-center justify-between">
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
          <Button variant="outline">
            <HugeiconsIcon
              icon={Share08Icon}
              className="size-3.5 fill-accent dark:fill-accent-foreground/20"
            />{" "}
            Share
          </Button>
        </div>

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
            {/* <h2 className="mb-2 text-foreground">Usage</h2> */}
            <div className="mb-4">
              <div className="relative overflow-hidden rounded-xl border border-border">
                <div className="flex items-center justify-between border-b border-border px-4 py-2">
                  <span className="text-xs text-muted-foreground">
                    Run this command from your project root, then ask your AI
                    assistant to use Motion.md for UI work.
                  </span>
                  <CopyButton
                    text="npx getdesign@latest add bmw-m"
                    label="Copy"
                    copiedLabel="Copied!"
                    className="h-8 px-2 text-xs"
                  />
                </div>
                <div className="p-4">
                  <CodeBlock className="">
                    <CodeBlockCode
                      code="npx getdesign@latest add bmw-m"
                      language="bash"
                    />
                  </CodeBlock>
                  {/* <p className="text-xs text-muted-foreground mt-2">
                  Run this command from your project root, then ask your AI
                  assistant to use DESIGN.md for UI work.
                </p> */}
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
                <div className="text-sm">3.7K</div>
              </div>

              <div className="flex items-center justify-between rounded-lg border bg-muted px-4 py-3">
                <div className="text-xs uppercase">Bookmarked</div>
                <div className="text-sm">366</div>
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
            <div className="mt-2 flex gap-1 text-xs leading-relaxed text-muted-foreground">
              <span className="mt-[1px]">✦</span>

              <p>
                Independent analysis of publicly observable patterns, curated as
                a starting point for inspiration. Not affiliated with or
                endorsed by BMW M
              </p>
            </div>

            {/* CTA */}
            {/* <RaisedButton
              variant="default"
              size="lg"
              className="w-full gap-2 sm:w-auto"
              color="#FF6B35"
            >
              <HugeiconsIcon icon={BoxIcon} className="size-5" />
              Get the full website starter kit →
            </RaisedButton> */}

            {/* Disclaimer */}
          </div>
        </div>

        <div className="relative">
          <FullWidthDivider position="top" className="w-full" />
          <BorderCross className="bottom-0 -left-4 -translate-x-1/2 translate-y-1/2" />
          <BorderCross className="-right-4 bottom-0 translate-x-1/2 translate-y-1/2" />
        </div>

        <Tabs defaultValue="markdown" className="mt-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <div className="flex flex-wrap items-center gap-2">
              <RaisedButton>LLM.txt</RaisedButton>
              <RaisedButton variant={"default"} color="#414141">
                <Link href="/bookmarks" className="flex items-center gap-1">
                  <HugeiconsIcon
                    icon={GithubIcon}
                    className="mr-1.5 size-4 fill-accent dark:fill-accent-foreground"
                  />
                  <span className="">GitHub Link</span>
                </Link>
              </RaisedButton>{" "}
              <RaisedButton>
                <Link href="/bookmarks" className="flex items-center gap-1">
                  <span className="">MOTION.md</span>
                </Link>
              </RaisedButton>{" "}
            </div>
          </div>

          <TabsContent value="markdown" className="relative mt-6">
            <section className="overflow-hidden rounded-2xl border bg-muted/50 shadow-sm">
              <div className="m-2 rounded-xl border bg-background shadow-sm">
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
                    <pre className="overflow-x-auto text-[13px] leading-relaxed text-foreground [&>code]:font-mono">
                      <code>{content}</code>
                    </pre>
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

import Link from "next/link"
import { GithubIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RaisedButton } from "@/components/ui/raised-button"
import { CopyButton } from "@/components/copy-button"
import { Markdown } from "@/components/ui/markdown"
import type { Motion } from "@/lib/motions"

type MotionMdTabsSectionProps = {
  motion: Motion
  content: string | null
}

export function MotionMdTabsSection({
  motion,
  content,
}: MotionMdTabsSectionProps) {
  return (
    <Tabs defaultValue="markdown" className="mt-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="markdown">Raw Markdown</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <div className="flex flex-wrap items-center gap-2">
          <RaisedButton size="sm">LLM.txt</RaisedButton>
          <RaisedButton variant={"default"} color="#414141" size="sm">
            <Link href="/bookmarks" className="flex items-center gap-1">
              <HugeiconsIcon
                icon={GithubIcon}
                className="mr-1 size-3.5 fill-accent dark:fill-accent-foreground"
              />
              <span className="">GitHub Link</span>
            </Link>
          </RaisedButton>{" "}
          <RaisedButton size="sm">
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
                  <div className="flex items-center gap-2">
                    <CopyButton
                      className="relative gap-1.5 pr-2.5 pl-2"
                      variant="outline"
                      size="default"
                      text={content}
                    >
                      Copy Markdown
                    </CopyButton>
                  </div>
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
        <Markdown className="prose prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs dark:prose-invert">
          {content}
        </Markdown>
      </TabsContent>
    </Tabs>
  )
}
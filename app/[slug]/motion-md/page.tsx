import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { getMotionBySlug } from "@/lib/motions";
import { BorderCross } from "@/components/ui/border-cross";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Header } from "@/components/landing/header";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowTurnBackwardIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

export async function generateStaticParams() {
  const { motions } = await import("@/lib/motions");
  return motions.map((d) => ({
    slug: d.slug,
  }));
}

export default async function MotionMdPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const design = getMotionBySlug(slug);

  if (!design) {
    notFound();
  }

  const motionMdPath = path.join(
    process.cwd(),
    "motion",
    design.motionDir,
    "motion.md"
  );

  const hasMotionFile = fs.existsSync(motionMdPath);
  let content: string | null = null;

  if (hasMotionFile) {
    content = fs.readFileSync(motionMdPath, "utf8");
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl overflow-hidden border-x px-4 lg:overflow-visible">
      <Header />
      <div className="relative">
        <FullWidthDivider position="bottom" className="w-full" />
        <BorderCross className="bottom-0 -left-4 -translate-x-1/2 translate-y-1/2" />
        <BorderCross className="-right-4 bottom-0 translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="py-4">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <HugeiconsIcon icon={ArrowTurnBackwardIcon} className="size-4" />
          Return
        </Link>

        <div className="flex items-center gap-4 my-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={design.logoLight}
            alt={design.name}
            width={48}
            height={48}
            className="size-11 p-2 border bg-background transition-colors group-hover:border-foreground/20 rounded-lg"
          />
          <div>
            <h1 className="text-lg font-medium">{design.name}</h1>
            <p className="text-muted-foreground">{design.description}</p>
          </div>
        </div>

        {/* <FullWidthDivider className="my-8" /> */}

        <article className="space-y-4 text-foreground">
          {content ? (
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => (
                  <h1 {...props} className="text-2xl font-bold mt-8 mb-4" />
                ),
                h2: ({ ...props }) => (
                  <h2 {...props} className="text-xl font-semibold mt-6 mb-3" />
                ),
                h3: ({ ...props }) => (
                  <h3 {...props} className="text-lg font-semibold mt-5 mb-2" />
                ),
                p: ({ ...props }) => <p {...props} className="leading-relaxed" />,
                ul: ({ ...props }) => (
                  <ul {...props} className="list-disc pl-6 space-y-1" />
                ),
                ol: ({ ...props }) => (
                  <ol {...props} className="list-decimal pl-6 space-y-1" />
                ),
                li: ({ ...props }) => <li {...props} className="text-muted-foreground" />,
                a: ({ ...props }) => (
                  <a
                    {...props}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  />
                ),
                code: ({ className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <pre className="mt-2 mb-2 p-4 rounded-lg bg-muted overflow-x-auto">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code
                      className="text-sm rounded bg-muted px-1.5 py-0.5"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                blockquote: ({ ...props }) => (
                  <blockquote
                    {...props}
                    className="border-l-2 pl-4 border-muted-foreground/30 italic text-muted-foreground"
                  />
                ),
              }}
            >
              {content}
            </Markdown>
          ) : (
            <p className="text-muted-foreground">Motion details for {design.name} will be coming soon!</p>
          )}
        </article>
      </div>
    </div>
  );
}

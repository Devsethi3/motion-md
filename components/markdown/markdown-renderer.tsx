import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import type { ReactNode } from "react";
import { CodeBlock } from "./code-block";
import { MarkdownHeading } from "./markdown-heading";
import { MarkdownTable, MarkdownTh, MarkdownTd } from "./markdown-table";
import { cn } from "@/lib/utils";

function extractCode(children: ReactNode): { code: string; lang: string } | null {
  if (
    !children ||
    typeof children !== "object" ||
    !("props" in children)
  ) {
    return null;
  }
  const props = (children as { props: { className?: string; children?: ReactNode } })
    .props;
  const match = /language-(\w+)/.exec(props.className || "");
  const lang = match?.[1] ?? "text";
  const code =
    typeof props.children === "string"
      ? props.children
      : Array.isArray(props.children)
        ? props.children.join("")
        : "";
  return { code, lang };
}

const components: Components = {
  h1: ({ children }) => <MarkdownHeading level={1}>{children}</MarkdownHeading>,
  h2: ({ children }) => <MarkdownHeading level={2}>{children}</MarkdownHeading>,
  h3: ({ children }) => <MarkdownHeading level={3}>{children}</MarkdownHeading>,
  h4: ({ children }) => <MarkdownHeading level={4}>{children}</MarkdownHeading>,
  h5: ({ children }) => <MarkdownHeading level={5}>{children}</MarkdownHeading>,
  h6: ({ children }) => <MarkdownHeading level={6}>{children}</MarkdownHeading>,

  p: ({ children }) => (
    <p className="leading-7 text-foreground/90 [&:not(:first-child)]:mt-5">
      {children}
    </p>
  ),

  ul: ({ children }) => (
    <ul className="my-5 ml-6 list-disc space-y-2 marker:text-muted-foreground/60">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-5 ml-6 list-decimal space-y-2 marker:text-muted-foreground">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-7 text-foreground/90 [&>ul]:my-2 [&>ol]:my-2">
      {children}
    </li>
  ),

  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    const className = cn(
      "font-medium text-primary underline underline-offset-4 decoration-primary/30",
      "transition-colors hover:decoration-primary",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
    );
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? "#"} className={className}>
        {children}
      </Link>
    );
  },

  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-primary/40 bg-muted/30 py-1 pl-5 pr-4 text-muted-foreground italic [&>p]:mt-0">
      {children}
    </blockquote>
  ),

  hr: () => <hr className="my-10 border-border" />,

  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,

  img: ({ src, alt }) =>
    typeof src === "string" ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        className="my-6 rounded-xl border"
        loading="lazy"
      />
    ) : null,

  table: (props) => <MarkdownTable {...props} />,
  th: (props) => <MarkdownTh {...props} />,
  td: (props) => <MarkdownTd {...props} />,

  // Inline code only — fenced blocks come through `pre`.
  code: ({ children }) => (
    <code className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  ),

  // Fenced code block: route to async, server-highlighted CodeBlock.
  pre: ({ children }) => {
    const extracted = extractCode(children);
    if (!extracted) return <pre>{children}</pre>;
    return <CodeBlock code={extracted.code} lang={extracted.lang} />;
  },
};

export async function MarkdownRenderer({ content }: { content: string }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </Markdown>
  );
}

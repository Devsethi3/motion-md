// components/markdown/markdown-heading.tsx
import { createElement, type ReactNode } from "react";
import { Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

function slugify(node: ReactNode): string {
  const text = extractText(node);
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

const STYLES: Record<Level, string> = {
  1: "scroll-mt-24 text-3xl font-semibold tracking-tight mt-0 mb-6 pb-3 border-b",
  2: "scroll-mt-24 text-2xl font-semibold tracking-tight mt-12 mb-4 pb-2 border-b",
  3: "scroll-mt-24 text-xl font-semibold tracking-tight mt-8 mb-3",
  4: "scroll-mt-24 text-lg font-semibold tracking-tight mt-6 mb-2",
  5: "scroll-mt-24 text-base font-semibold tracking-tight mt-4 mb-2",
  6: "scroll-mt-24 text-sm font-semibold uppercase tracking-wider text-muted-foreground mt-4 mb-2",
};

export function MarkdownHeading({
  level,
  children,
}: {
  level: Level;
  children: ReactNode;
}) {
  const id = slugify(children);
  const tag = `h${level}`;

  return createElement(
    tag,
    { id, className: cn("group relative flex items-center gap-2", STYLES[level]) },
    <>
      <span>{children}</span>
      <a
        href={`#${id}`}
        aria-label={`Link to this section`}
        tabIndex={-1}
        className={cn(
          "opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100",
          "text-muted-foreground hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        )}
      >
        <LinkIcon className="size-4" />
      </a>
    </>
  );
}

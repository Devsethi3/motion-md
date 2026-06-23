// components/markdown/code-block.tsx
import { highlightCode } from "@/lib/shiki";
import { cn } from "@/lib/utils";
import { CodeCopyButton } from "./code-copy-button";

interface CodeBlockProps {
  code: string;
  lang?: string;
  className?: string;
}

export async function CodeBlock({ code, lang = "text", className }: CodeBlockProps) {
  const trimmed = code.replace(/\n$/, "");
  const html = await highlightCode(trimmed, lang);

  return (
    <div
      className={cn(
        "group relative my-6 overflow-hidden rounded-xl border bg-[var(--shiki-bg,theme(colors.muted.DEFAULT))]",
        className
      )}
    >
      <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {lang === "text" ? "code" : lang}
        </span>
        <CodeCopyButton code={trimmed} />
      </div>

      <div
        className="shiki-wrapper overflow-x-auto p-4 text-[13px] leading-relaxed [&_pre]:bg-transparent [&_pre]:!outline-none [&_code]:font-mono"
        // Shiki output is generated server-side from trusted local .md files.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

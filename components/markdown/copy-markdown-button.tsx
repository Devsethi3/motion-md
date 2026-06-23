// components/markdown/copy-markdown-button.tsx
"use client";

import { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyMarkdownButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [content]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "MOTION.md copied" : "Copy entire MOTION.md"}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-sm font-medium transition-colors",
        "hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
      )}
    >
      {copied ? (
        <>
          <Check className="size-4 text-emerald-500" />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-4" />
          Copy file
        </>
      )}
    </button>
  );
}

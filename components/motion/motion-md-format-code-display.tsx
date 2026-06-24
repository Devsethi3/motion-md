"use client"

import { CopyButton } from "@/components/copy-button"

type CodeDisplayProps = {
  label: string
  code: string
  copyText?: string
}

export function MotionMdFormatCodeDisplay({
  label,
  code,
  copyText,
}: CodeDisplayProps) {
  return (
    <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
        <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {label}
        </span>
        {copyText ? (
          <CopyButton
            text={copyText}
            className="h-8 px-2 text-xs"
          >
            Copy
          </CopyButton>
        ) : null}
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-foreground">{code}</code>
      </pre>
    </div>
  )
}

"use client"

import { CopyButton } from "@/components/copy-button"
import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block"

type CodeDisplayProps = {
  label: string
  code: string
  copyText?: string
  language?: string
}

export function MotionMdFormatCodeDisplay({
  label,
  code,
  copyText,
  language = "plaintext",
}: CodeDisplayProps) {
  return (
    <div className="not-prose my-4 overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
        <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {label}
        </span>
        {copyText ? (
          <CopyButton text={copyText} className="" variant='outline' size='icon-sm' />
        ) : null}
      </div>
      <CodeBlock className="border-0 rounded-t-none">
        <CodeBlockCode code={code} language={language} />
      </CodeBlock>
    </div>
  )
}
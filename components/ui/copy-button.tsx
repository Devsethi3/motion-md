"use client";

import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  variant?: string;
  size?: string;
  className?: string;
}

export function CopyButton({ 
  text, 
  label = "Copy", 
  copiedLabel = "Copied!",
  variant = "outline",
  size = "sm",
  className 
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          {copiedLabel}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}

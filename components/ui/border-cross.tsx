import { cn } from "@/lib/utils"

export function BorderCross({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-20 size-3 rotate-45 border border-border bg-muted",
        className
      )}
      aria-hidden="true"
    />
  )
}

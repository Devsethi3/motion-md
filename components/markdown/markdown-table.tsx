// components/markdown/markdown-table.tsx
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function MarkdownTable(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 w-full overflow-x-auto rounded-xl border">
      <table {...props} className="w-full border-collapse text-sm" />
    </div>
  );
}

export function MarkdownTh(props: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      {...props}
      className={cn(
        "border-b bg-muted/50 px-4 py-2.5 text-left font-semibold",
        "whitespace-nowrap"
      )}
    />
  );
}

export function MarkdownTd(props: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      {...props}
      className="border-b px-4 py-2.5 align-top text-muted-foreground [tr:last-child_&]:border-0"
    />
  );
}

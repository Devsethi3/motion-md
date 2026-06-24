"use client"

import Link from "next/link"
import { ArrowTurnBackwardIcon, Share08Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"

export function MotionMdHeaderActions() {
  return (
    <div className="flex items-center justify-between">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mb-4 w-fit text-foreground/70"
        )}
      >
        <HugeiconsIcon icon={ArrowTurnBackwardIcon} className="size-4" />
        Back to Home
      </Link>
      <Button variant="outline">
        <HugeiconsIcon
          icon={Share08Icon}
          className="size-3.5 fill-accent dark:fill-accent-foreground/20"
        />{" "}
        Share
      </Button>
    </div>
  )
}
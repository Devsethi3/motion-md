"use client"

import type { ComponentProps } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import type { CopyState } from "@/hooks/use-copy-to-clipboard"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"
import { IconSwap, IconSwapItem } from "@/components/icon-swap"
import { HugeiconsIcon } from "@hugeicons/react"
import { Copy01Icon, Tick02Icon, CancelCircleIcon } from "@hugeicons/core-free-icons"

export type CopyStateIconProps = {
  state: CopyState
  /** Custom icon for idle state. */
  idleIcon?: React.ReactNode
  /** Custom icon for done state. */
  doneIcon?: React.ReactNode
  /** Custom icon for error state. */
  errorIcon?: React.ReactNode
}

export function CopyStateIcon({
  state,
  idleIcon,
  doneIcon,
  errorIcon,
}: CopyStateIconProps) {
  return (
    <IconSwap>
      <IconSwapItem key={state} as={motion.span}>
        {state === "idle" &&
          (idleIcon ?? (
            <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} data-slot="idle-icon" />
          ))}

        {state === "done" &&
          (doneIcon ?? (
            <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} data-slot="done-icon" />
          ))}

        {state === "error" &&
          (errorIcon ?? (
            <HugeiconsIcon icon={CancelCircleIcon} strokeWidth={2} data-slot="error-icon" />
          ))}
      </IconSwapItem>
    </IconSwap>
  )
}

export type CopyButtonProps = ComponentProps<typeof Button> & {
  /** The text to copy, or a function that returns the text. */
  text: string | (() => string)
  /** Called with the copied text on successful copy. */
  onCopySuccess?: (text: string) => void
  /** Called with the error if the copy operation fails. */
  onCopyError?: (error: Error) => void
} & Omit<CopyStateIconProps, "state">

export function CopyButton({
  className,
  size = "icon",
  children,
  text,
  idleIcon,
  doneIcon,
  errorIcon,
  onClick,
  onCopySuccess,
  onCopyError,
  ...props
}: CopyButtonProps) {
  const { state, copy } = useCopyToClipboard({
    onCopySuccess,
    onCopyError,
  })

  return (
    <Button
      className={cn("will-change-transform", className)}
      size={size}
      onClick={(e) => {
        copy(text)
        onClick?.(e)
      }}
      aria-label="Copy"
      {...props}
    >
      <CopyStateIcon
        state={state}
        idleIcon={idleIcon}
        doneIcon={doneIcon}
        errorIcon={errorIcon}
      />
      {children}
    </Button>
  )
}

"use client"

import { MoonIcon, SunMediumIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { LayerMask01Icon } from "@hugeicons/core-free-icons"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const [click] = useClickSound()

  const switchTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const handleThemeToggleClick = () => {
    click()
    if (!document.startViewTransition) switchTheme()
    else document.startViewTransition(switchTheme)
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        aria-label="Theme Toggle"
        onClick={handleThemeToggleClick}
      >
        <HugeiconsIcon icon={LayerMask01Icon} className="-rotate-40" />
        {/* <HugeiconsIcon icon={LayerMask01Icon} className="hidden [html.dark_&]:block -rotate-40  " /> */}
        {/* <SunMediumIcon className="hidden [html.light_&]:block" /> */}
      </Button>
    </div>
  )
}

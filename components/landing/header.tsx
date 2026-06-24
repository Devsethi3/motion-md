"use client"
import { memo, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks/use-scroll"
import Link from "next/link"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { BorderCross } from "@/components/ui/border-cross"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ClipboardIcon,
  File02Icon,
  GithubIcon,
  EarthIcon,
  LayerIcon,
  Menu03Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "../ui/button"
import { RaisedButton } from "../ui/raised-button"
import { Logo } from "../ui/logo"
import ThemeToggle from "../ui/theme-toggle"

const navLinks = [
  {
    href: "/motion-md-format",
    icon: ClipboardIcon,
    label: "motion.md format",
  },
  { href: "/", icon: EarthIcon, label: "Websites" },
  { href: "/docs", icon: File02Icon, label: "Docs" },
]

export const Header = memo(() => {
  const scrolled = useScroll(10)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={cn("relative top-0 z-50 w-full", {
        "bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
          scrolled,
      })}
    >
      <FullWidthDivider position="bottom" className="w-full" />
      <BorderCross className="bottom-0 -left-4 -translate-x-1/2 translate-y-1/2" />
      <BorderCross className="-right-4 bottom-0 translate-x-1/2 translate-y-1/2" />

      {/* Mobile overlay backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <nav className="relative z-50 mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-2 px-2 sm:px-4">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop center nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button key={link.label} variant="ghost" asChild>
              <Link href={link.href}>
                <HugeiconsIcon
                  icon={link.icon}
                  className="mr-1 size-4 fill-accent dark:fill-accent-foreground/20"
                />
                <span>{link.label}</span>
              </Link>
            </Button>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link href="https://github.com/Devsethi3/motion-md" target="_blank">
            <RaisedButton
              variant="default"
              color="#414141"
              size="sm"
              className="flex items-center gap-1"
            >
              <HugeiconsIcon
                icon={GithubIcon}
                className="size-4 fill-accent dark:fill-foreground"
              />
              <span>GitHub</span>
            </RaisedButton>
          </Link>
          <Link href="/bookmarks">
            <RaisedButton
              variant="default"
              size="sm"
              className="flex items-center gap-1"
            >
              <HugeiconsIcon
                icon={LayerIcon}
                className="size-4 fill-accent dark:fill-foreground"
              />
              <span>Explore Library</span>
            </RaisedButton>
          </Link>
        </div>

        {/* Mobile right side */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="relative z-100"
          >
            <HugeiconsIcon
              icon={Menu03Icon}
              className={cn(
                "size-4 transition-all duration-200",
                mobileMenuOpen && "scale-0 rotate-180 opacity-0"
              )}
            />
            <HugeiconsIcon
              icon={Cancel01Icon}
              className={cn(
                "absolute inset-0 m-auto size-4 transition-all duration-200",
                mobileMenuOpen
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 -rotate-180 opacity-0"
              )}
            />
          </Button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <div
        className={cn(
          "absolute right-0 left-0 z-40 overflow-hidden rounded-xl border-b border-border bg-background/95 backdrop-blur-lg transition-all duration-300 ease-out md:hidden",
          mobileMenuOpen
            ? "max-h-[32rem] opacity-100"
            : "max-h-0 opacity-0 shadow-none"
        )}
      >
        <div className="flex flex-col gap-2 px-4 pt-4 pb-6">
          {/* Navigation links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={link.icon}
                  className="size-4 fill-accent dark:fill-accent-foreground/20"
                />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="my-2 border-t border-border" />

          {/* GitHub link */}
          <div className="flex flex-col gap-1">
            <Link
              href="https://github.com/Devsethi3/motion-md"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <HugeiconsIcon
                icon={GithubIcon}
                className="size-4 fill-accent dark:fill-foreground"
              />
              GitHub
            </Link>

            {/* Explore Library link */}
            <Link
              href="/bookmarks"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <HugeiconsIcon
                icon={LayerIcon}
                className="size-4 fill-accent dark:fill-foreground"
              />
              Explore Library
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
})

"use client"
import { memo } from "react"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks/use-scroll"
import Link from "next/link"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { BorderCross } from "@/components/ui/border-cross"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ClipboardIcon,
  GithubIcon,
  LayerIcon,
  UserQuestion01Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "../ui/button"
import { RaisedButton } from "../ui/raised-button"
import { Logo } from "../ui/logo"

export const Header = memo(() => {
  const scrolled = useScroll(10)

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
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>{" "}
        <div className="flex items-center gap-2">
          <Button className="" variant={"ghost"}>
            <Link href="/" className="flex items-center">
              <HugeiconsIcon
                icon={ClipboardIcon}
                className="mr-1 size-4 fill-accent dark:fill-foreground"
              />
              motion.md format
            </Link>
          </Button>
          <Button className="" variant={"ghost"}>
            <Link href="/">Websites</Link>
          </Button>
          <Button className="" variant={"ghost"}>
            <Link href="/" className="flex items-center">
              <HugeiconsIcon
                icon={UserQuestion01Icon}
                className="mr-1 size-4 fill-accent dark:fill-foreground"
              />
              Author
            </Link>{" "}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <RaisedButton variant={"default"} color="#414141" size="sm">
            <Link href="/bookmarks" className="flex items-center gap-1">
              <HugeiconsIcon
                icon={GithubIcon}
                className="mr-1.5 size-4 fill-accent dark:fill-foreground"
              />
              <span className="">GitHub</span>
            </Link>
          </RaisedButton>
          <RaisedButton variant={"default"} size="sm">
            <Link href="/bookmarks" className="flex items-center gap-1">
              <HugeiconsIcon
                icon={LayerIcon}
                className="mr-1.5 size-4 fill-accent dark:fill-foreground"
              />
              <span className="">Explore Library</span>
            </Link>
          </RaisedButton>
        </div>
      </nav>
    </header>
  )
})

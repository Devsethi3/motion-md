"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import Image from "next/image"

type LogoProps = {
  className?: string
  showText?: boolean
}

export function Logo({ className, showText = false }: LogoProps) {
  const { resolvedTheme } = useTheme()
  return (
    <div className={cn("inline-flex items-center gap-2 pt-1", className)}>
      <svg
        data-logo="logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 229.5 41"
        width="120"
        height="40"
      >
        <g
          id="logogram"
          transform="
    translate(0, 0.5)
    rotate(0 27 20)
    
  "
        >
          <path d="M26 0H38V12H26V0Z" fill="#0A6FAB" />
          <path d="M38 12H54V28H38V12Z" fill="#0A6FAB" />
          <path d="M26 28H38V40H26V28Z" fill="#0A6FAB" />
          <path d="M16 12H26V22H16V12Z" fill="#0A6FAB" />
          <path d="M8 22H16V30H8V22Z" fill="#0A6FAB" />
          <path d="M6 2H16V12H6V2Z" fill="#0A6FAB" />
          <path d="M0 12H6V18H0V12Z" fill="#0A6FAB" />
        </g>
        <g id="logotype" transform="translate(60, 11)">
          <path
            fill={resolvedTheme === "dark" ? "white" : "black"}
            className="opacity-85"
            d="M13.50 19L9.75 19L9.75 0.25L13.50 0.25L13.50 4L17.25 4L17.25 7.75L21 7.75L21 11.50L17.25 11.50L17.25 7.75L13.50 7.75L13.50 19ZM28.50 19L24.75 19L24.75 7.75L21 7.75L21 4L24.75 4L24.75 0.25L28.50 0.25L28.50 19ZM44.25 19L36.75 19L36.75 15.25L33 15.25L33 4L36.75 4L36.75 0.25L44.25 0.25L44.25 4L48 4L48 15.25L44.25 15.25L44.25 19ZM36.75 4.15L36.75 15.10L44.25 15.10L44.25 4.15L36.75 4.15ZM60 19L56.25 19L56.25 4L52.50 4L52.50 0.25L63.75 0.25L63.75 4L60 4L60 19ZM72 19L68.25 19L68.25 0.25L72 0.25L72 19ZM87.75 19L80.25 19L80.25 15.25L76.50 15.25L76.50 4L80.25 4L80.25 0.25L87.75 0.25L87.75 4L91.50 4L91.50 15.25L87.75 15.25L87.75 19ZM80.25 4.15L80.25 15.10L87.75 15.10L87.75 4.15L80.25 4.15ZM99.75 19L96 19L96 0.25L99.75 0.25L99.75 4L103.50 4L103.50 7.75L107.25 7.75L107.25 11.50L111 11.50L111 0.25L114.75 0.25L114.75 19L111 19L111 15.25L107.25 15.25L107.25 11.50L103.50 11.50L103.50 7.75L99.75 7.75L99.75 19ZM135 19L131.25 19L131.25 0.25L135 0.25L135 7.75L138.75 7.75L138.75 11.50L142.50 11.50L142.50 15.25L146.25 15.25L146.25 19L142.50 19L142.50 15.25L138.75 15.25L138.75 11.50L135 11.50L135 19ZM146.25 4L142.50 4L142.50 0.25L146.25 0.25L146.25 4ZM142.50 7.75L138.75 7.75L138.75 4L142.50 4L142.50 7.75ZM154.50 19L150.75 19L150.75 0.25L154.50 0.25L154.50 19ZM166.50 19L162.75 19L162.75 4L159 4L159 0.25L170.25 0.25L170.25 4L166.50 4L166.50 19Z"
          />
        </g>
      </svg>

      {/* <Image src={"/logo.svg"} width={120} height={120} alt="logo" /> */}
      {showText ? (
        <span className="font-heading text-lg text-foreground/80">
          Motion Kit
        </span>
      ) : null}
    </div>
  )
}

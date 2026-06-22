"use client"
import { ClipboardIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import Image from "next/image"

const HeroSection = () => {
  const { resolvedTheme } = useTheme()

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const headingWords = [
    "High-quality",
    "MOTION.md",
    "examples",
    "for",
    "AI",
    "agents",
  ]

  const gradientText =
    "bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-2xl text-transparent dark:from-foreground dark:to-foreground/40"

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <motion.h1
        className="inline-flex flex-wrap items-center justify-center gap-x-1.5"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        {headingWords.map((word, i) => (
          <div key={i} className="inline-flex items-center gap-1">
            {i === 1 && (
              <HugeiconsIcon
                key="icon"
                icon={ClipboardIcon}
                className="inline-block size-5 shrink-0 translate-y-px fill-accent! align-middle dark:fill-accent-foreground/10!"
              />
            )}
            <motion.span
              key={word}
              variants={wordVariants}
              className={gradientText}
            >
              {word}
            </motion.span>
          </div>
        ))}
      </motion.h1>

      <div className="mt-3 max-w-xl text-center text-sm leading-relaxed text-foreground/70">
        <p>
          Motion systems from leading product websites. Open any style for
          animations, transitions and a{" "}
          <span className="inline-flex items-center gap-0.5 align-middle">
            <HugeiconsIcon
              icon={ClipboardIcon}
              className="size-4 shrink-0 fill-accent dark:fill-accent-foreground/10"
            />
            <span className="font-medium text-foreground underline">
              MOTION.md
            </span>
          </span>{" "}
          you can drop straight into{" "}
          <InlineTool
            src={
              resolvedTheme === "dark"
                ? "/cursor_dark.svg"
                : "/cursor_light.svg"
            }
            alt="Cursor"
            size={12}
            label="Cursor"
          />
          {", "}
          <InlineTool
            src="/claude.svg"
            alt="Claude"
            size={14}
            label="Claude Code"
          />
          {", "}
          <InlineTool
            src={
              resolvedTheme === "dark" ? "/codex_dark.svg" : "/codex_light.svg"
            }
            alt="Codex"
            size={14}
            label="Codex"
          />
          {", v0, or "}
          <InlineTool
            src="/lovable.svg"
            alt="Lovable"
            size={12}
            label="Lovable."
          />{" "}
          Explore handpicked examples of motion systems in action.
        </p>
      </div>
    </div>
  )
}

const InlineTool = ({
  src,
  alt,
  size,
  label,
}: {
  src: string
  alt: string
  size: number
  label: string
}) => (
  <span className="inline-flex items-center gap-1 align-middle">
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="shrink-0"
    />
    <span>{label}</span>
  </span>
)

export default HeroSection
  
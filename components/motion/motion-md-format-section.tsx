"use client"

import type { ReactNode } from "react"

type SectionProps = {
  id: string
  title: string
  titleLevel?: 2 | 3
  children: ReactNode
}

export function MotionMdFormatSection({
  id,
  title,
  titleLevel = 2,
  children,
}: SectionProps) {
  const TitleTag = titleLevel === 2 ? "h2" : "h3"

  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <TitleTag className="lg:text-lg text-base font-medium text-foreground">
        {title}
      </TitleTag>
      {titleLevel === 2 && <hr className="!my-2 border-border" />}
      {children}
    </section>
  )
}
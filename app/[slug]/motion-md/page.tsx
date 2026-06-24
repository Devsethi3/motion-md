import { cache } from "react"
import { promises as fs } from "fs"
import path from "path"
import { notFound } from "next/navigation"

import { getMotionBySlug } from "@/lib/motions"
import { BorderCross } from "@/components/ui/border-cross"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { Header } from "@/components/landing/header"
import { MotionMdHeaderActions } from "@/components/motion/motion-md-header-actions"
import { MotionMdInfoSection } from "@/components/motion/motion-md-info-section"
import { MotionMdTabsSection } from "@/components/motion/motion-md-tabs-section"

export async function generateStaticParams() {
  const { motions } = await import("@/lib/motions")
  return motions.map((motion) => ({
    slug: motion.slug,
  }))
}

const getMotionMdContent = cache(async (motionDir: string) => {
  const filePath = path.join(process.cwd(), "motion", motionDir, "motion.md")

  try {
    return await fs.readFile(filePath, "utf8")
  } catch {
    return null
  }
})

export default async function MotionMdPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const motion = getMotionBySlug(slug)

  if (!motion) {
    notFound()
  }

  const content = await getMotionMdContent(motion.motionDir)

  return (
    <div className="mx-auto min-h-screen max-w-7xl border-x px-4">
      <Header />

      <div className="relative">
        <FullWidthDivider position="bottom" className="w-full" />
        <BorderCross className="bottom-0 -left-4 -translate-x-1/2 translate-y-1/2" />
        <BorderCross className="-right-4 bottom-0 translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="py-4 pb-10">
        <MotionMdHeaderActions />

        <MotionMdInfoSection motion={motion} />

        <div className="relative">
          <FullWidthDivider position="top" className="w-full" />
          <BorderCross className="bottom-0 -left-4 -translate-x-1/2 translate-y-1/2" />
          <BorderCross className="-right-4 bottom-0 translate-x-1/2 translate-y-1/2" />
        </div>

        <MotionMdTabsSection motion={motion} content={content} />
      </div>
    </div>
  )
}
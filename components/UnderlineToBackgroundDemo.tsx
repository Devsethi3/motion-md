"use client"

import { motion } from "motion/react"
import UnderlineToBackground from "./ui/underline-to-background"

export default function UnderlineToBackgroundDemo() {
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

  const words = "Weekly goodies delivered straight to your inbox —".split(" ")

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.h2
        className="p-12 text-xl text-[#0015ff] md:p-24"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="mr-1 inline-block"
          >
            {word}
          </motion.span>
        ))}
        <motion.span variants={wordVariants} className="inline-block">
          <UnderlineToBackground
            targetTextColor="#f0f0f0"
            className="cursor-pointer"
          >
            subscribe
          </UnderlineToBackground>
        </motion.span>
      </motion.h2>
    </div>
  )
}

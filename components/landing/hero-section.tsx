"use client"
import { motion } from "motion/react"

const HeroSection = () => {
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

  const words = "Weekly goodies delivered straight to your inbox".split(" ")

  return (
    <>
      <div className="flex flex-col items-center justify-center py-16">
        <motion.h1
          className="p-12 text-xl bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-transparent dark:from-foreground dark:to-foreground/40 md:p-24"
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
        </motion.h1>{" "}
      </div>
    </>
  )
}

export default HeroSection

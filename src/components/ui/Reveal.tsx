import * as React from "react"
import { m, useReducedMotion } from "motion/react"
import { REVEAL, SOFT_REVEAL } from "@/lib/motion"

interface RevealProps {
  children: React.ReactNode
  className?: string
  soft?: boolean
}

const Reveal = ({ children, className, soft = false }: RevealProps) => {
  const shouldReduceMotion = useReducedMotion()
  const variants = soft ? SOFT_REVEAL : REVEAL

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <m.div
      className={className}
      initial={variants.initial}
      whileInView={variants.whileInView}
      viewport={variants.viewport}
      transition={variants.transition}
    >
      {children}
    </m.div>
  )
}

export { Reveal }
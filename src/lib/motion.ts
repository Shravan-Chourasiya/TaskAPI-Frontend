// Shared motion presets. One library (motion/react), consistent everywhere.
// Goal: settled and quiet, not playful.

export const SPRING = {
  default: { type: "spring" as const, stiffness: 300, damping: 30 },
  soft: { type: "spring" as const, stiffness: 200, damping: 26 },
  snappy: { type: "spring" as const, stiffness: 400, damping: 35 },
}

export const PAGE_TRANSITION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15, ease: "easeOut" as const },
}

export const REVEAL = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -50px 0px" },
  transition: SPRING.default,
}

export const SOFT_REVEAL = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -50px 0px" },
  transition: SPRING.soft,
}

export const BUTTON_HOVER = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: SPRING.default,
}

export const CARD_HOVER = {
  whileHover: { y: -2 },
  transition: SPRING.default,
}

export const MODAL_BACKDROP = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15, ease: "easeOut" as const },
}

export const MODAL_PANEL = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: SPRING.default,
}

export const SKELETON_FADE = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: "easeOut" as const },
}

export const CONTENT_FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2, ease: "easeOut" as const },
}

import { Variants } from "framer-motion";

// ─── Page Transitions ──────────────────────────────────────────
export const pageVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.25, ease: "easeIn" } },
};

// ─── Stagger container ─────────────────────────────────────────
export const containerVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// ─── Item fade-up ──────────────────────────────────────────────
export const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// ─── Scale in ─────────────────────────────────────────────────
export const scaleVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

// ─── Slide from right ─────────────────────────────────────────
export const slideRightVariants: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit:    { opacity: 0, x: -40, transition: { duration: 0.25 } },
};

// ─── Slide from left ──────────────────────────────────────────
export const slideLeftVariants: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Card hover ───────────────────────────────────────────────
export const cardHover = {
  rest:  { scale: 1,    y: 0,    boxShadow: "0 8px 32px rgba(0,0,0,0.4)" },
  hover: { scale: 1.02, y: -4,  boxShadow: "0 16px 48px rgba(124,58,237,0.3)" },
};

// ─── Button tap ───────────────────────────────────────────────
export const buttonTap = { scale: 0.96 };

// ─── Fade in ──────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

// ─── Flip card ────────────────────────────────────────────────
export const flipFront: Variants = {
  front: { rotateY: 0,    transition: { duration: 0.5, ease: "easeInOut" } },
  back:  { rotateY: 180,  transition: { duration: 0.5, ease: "easeInOut" } },
};

export const flipBack: Variants = {
  front: { rotateY: -180, transition: { duration: 0.5, ease: "easeInOut" } },
  back:  { rotateY: 0,    transition: { duration: 0.5, ease: "easeInOut" } },
};

// ─── Typing indicator ─────────────────────────────────────────
export const typingDot: Variants = {
  start: { y: 0 },
  end:   { y: -6, transition: { duration: 0.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } },
};

// ─── Pulse ring ───────────────────────────────────────────────
export const pulseRing: Variants = {
  start: { scale: 1, opacity: 0.7 },
  end:   { scale: 1.6, opacity: 0, transition: { duration: 1.5, repeat: Infinity, ease: "easeOut" } },
};

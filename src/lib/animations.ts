import type { Easing, Variants } from "motion/react";

/** Custom easing curves */
export const easeOut: Easing = [0.23, 1, 0.32, 1];
export const easeInOut: Easing = [0.445, 0.05, 0.55, 0.95];

/** Fade up: opacity 0→1, y 12→0 over 400ms */
export const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
} satisfies Variants;

/** Fade + scale: opacity 0→1, scale 0.95→1 over 250ms */
export const fadeScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: easeOut },
  },
} satisfies Variants;

/** Stagger container – wrap children that use `staggerItem` */
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
} satisfies Variants;

/** Stagger item – same motion as fadeUp, used inside a stagger container */
export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
} satisfies Variants;

/** Button press feedback – spread onto interactive motion elements */
export const buttonPress = {
  whileTap: { scale: 0.97 },
  transition: { duration: 0.1 },
};

export type { Variants };

import { Variants } from "framer-motion";

export const buttonVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.01 } },
  open: { opacity: 1 },
};
export const buttonHolderVariants: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};
export const cardVariants: Variants = {
  closed: { opacity: 0, scale: 0, y: 0 },
  open: { opacity: 1, scale: 1, y: 0 },
  shake: { x: [null, 5, -5, 5, -5, 0], transition: { duration: 0.4 } },
};

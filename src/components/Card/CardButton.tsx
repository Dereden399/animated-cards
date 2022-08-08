import { motion } from "framer-motion";
import React from "react";
import { buttonVariants } from "./variants";

const CardButton = ({
  handler,
  icon,
}: {
  handler: React.MouseEventHandler<HTMLButtonElement>;
  icon: JSX.Element;
}) => (
  <motion.button
    className='h-8 w-8 border-slate-300 border-2 rounded-full'
    variants={buttonVariants}
    onClick={e => {
      e.stopPropagation();
      handler(e);
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {icon}
  </motion.button>
);

export default CardButton;

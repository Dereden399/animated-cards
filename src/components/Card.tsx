import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useState } from "react";
import { DotsHorizontalIcon, TrashIcon } from "@heroicons/react/solid";
import { CardType } from "../App";

const buttonVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.01 } },
  open: { opacity: 1 },
};
const btnHolderVariants: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const Card = ({ card }: { card: CardType }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setIsOpen(isOpen => !isOpen);
  };
  return (
    <motion.div
      layout
      className={`${
        isOpen ? "w-96 h-fit min-h-[16rem]" : "w-60 h-40"
      } bg-slate-100 shadow-xl rounded-md border-slate-200 border-[1px] flex flex-row
        items-center text-lg cursor-pointer p-5
        ${!isOpen && "hover:shadow-2xl"}`}
      onClick={toggleOpen}
      transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
      whileHover={!isOpen ? { scale: 1.1, y: -8 } : {}}
    >
      <motion.div
        layout
        className={`flex flex-col grow h-full items-center gap-y-5 justify-start ${
          !isOpen ? "pt-10" : ""
        }`}
      >
        <motion.h1 className={isOpen ? "text-3xl" : "text-lg"} layout>
          {card.text}
        </motion.h1>
        <AnimatePresence>
          {isOpen && (
            <motion.p
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2, duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.01 } }}
            >
              {card.description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {isOpen && (
        <motion.div
          className='flex flex-col gap-y-2 justify-start self-start'
          layout
          variants={btnHolderVariants}
          initial='closed'
          animate='open'
          exit='closed'
        >
          <motion.button
            className='h-8 w-8 border-slate-300 border-2 rounded-full'
            variants={buttonVariants}
          >
            <DotsHorizontalIcon />
          </motion.button>
          <motion.button
            className='h-8 w-8 border-slate-300 border-2 rounded-full'
            variants={buttonVariants}
          >
            <TrashIcon />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Card;

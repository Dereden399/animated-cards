import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useState } from "react";
import {
  CheckIcon,
  DotsHorizontalIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/solid";
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
const cardVariants: Variants = {
  closed: { opacity: 0, scale: 0 },
  open: { opacity: 1, scale: 1 },
};

const Card = ({
  card,
  deleteHandler,
  updateHandler,
}: {
  card: CardType;
  deleteHandler: (id: number) => void;
  updateHandler: (newCard: CardType) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const toggleOpen = () => {
    if (isOpen) setIsUpdating(false);
    setIsOpen(isOpen => !isOpen);
  };
  const [textField, setTextField] = useState<string>(card.text);
  const [descriptionField, setDescriptionField] = useState<string>(
    card.description
  );
  return (
    <motion.div
      layout
      className={`${
        isOpen ? "w-96 h-fit min-h-[16rem]" : "w-60 h-40"
      } bg-slate-100 shadow-xl rounded-md border-slate-200 border-[1px] flex flex-row
        items-center text-lg ${!isUpdating && "cursor-pointer"} p-5
        ${!isOpen && "hover:shadow-2xl"}`}
      onClick={e => (isUpdating ? null : toggleOpen())}
      transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
      whileHover={!isOpen ? { scale: 1.1, y: -8 } : {}}
      variants={cardVariants}
      initial='closed'
      animate='open'
      exit='closed'
    >
      <motion.div
        layout
        className={`flex flex-col grow h-full items-center gap-y-5 justify-start ${
          !isOpen ? "pt-10" : ""
        }`}
      >
        {!isUpdating ? (
          <motion.h1
            className={isOpen ? "text-3xl text-center" : "text-lg text-center"}
            layout
          >
            {card.text}
          </motion.h1>
        ) : (
          <input
            className='text-center w-[95%] bg-transparent border-b-2 border-slate-300 text-3xl focus:outline-0'
            value={textField}
            onChange={e => setTextField(e.target.value)}
          />
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.p
              id={`card-${card.id}-text`}
              className={
                isUpdating ? "border-b-2 border-slate-300 focus:outline-0" : ""
              }
              contentEditable={isUpdating}
              suppressContentEditableWarning={true}
              onInput={e => {
                setDescriptionField(e.currentTarget.textContent || "");
              }}
              layout
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.2, duration: 1 },
              }}
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
          {!isUpdating ? (
            <motion.button
              className='h-8 w-8 border-slate-300 border-2 rounded-full'
              variants={buttonVariants}
              onClick={e => {
                e.stopPropagation();
                setIsUpdating(true);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <DotsHorizontalIcon />
            </motion.button>
          ) : (
            <motion.button
              className='h-8 w-8 border-slate-300 border-2 rounded-full'
              variants={buttonVariants}
              onClick={e => {
                e.stopPropagation();
                setIsUpdating(false);
                if (
                  textField !== card.text ||
                  descriptionField !== card.description
                ) {
                  const newCard: CardType = {
                    text: textField,
                    description: descriptionField,
                    id: card.id,
                  };
                  updateHandler(newCard);
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <CheckIcon className='fill-green-500' />
            </motion.button>
          )}

          <motion.button
            className='h-8 w-8 border-slate-300 border-2 rounded-full'
            variants={buttonVariants}
            onClick={e => {
              e.stopPropagation();
              if (isUpdating) {
                setTextField(card.text);
                setDescriptionField(card.description);
                setIsUpdating(false);
                const el = document.getElementById(`card-${card.id}-text`);
                if (el) el.innerHTML = card.description;
              } else {
                setIsUpdating(false);
                deleteHandler(card.id);
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isUpdating ? <XIcon /> : <TrashIcon />}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Card;

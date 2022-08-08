import { motion } from "framer-motion";
import React from "react";
import { CardType } from "../../App";

const CardDescription = ({
  isOpen,
  isUpdating,
  card,
  shakeCard,
  descriptionField,
  setDescriptionField,
}: {
  isOpen: boolean;
  isUpdating: boolean;
  card: CardType;
  shakeCard: () => Promise<void>;
  descriptionField: string;
  setDescriptionField: React.Dispatch<React.SetStateAction<string>>;
}) => {
  if (!isOpen) return null;

  const inputHandler = (e: React.FormEvent<HTMLParagraphElement>) => {
    if (
      (e.currentTarget.textContent &&
        e.currentTarget.textContent.length <= 450) ||
      !e.currentTarget.textContent
    )
      setDescriptionField(e.currentTarget.textContent || "");
    else {
      e.currentTarget.innerHTML = descriptionField;
      const range = document.createRange();
      const sel = document.getSelection();
      range.setStart(e.currentTarget, 1);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
      e.currentTarget.focus();
      const oldTimer = window.localStorage.getItem("errorTimer");
      if (oldTimer) {
        clearTimeout(oldTimer);
      }
      const timer = setTimeout(() => {
        document
          .getElementById(`card-${card.id}-text`)
          ?.classList.remove("invalidP");
        document
          .getElementById(`card-${card.id}-text`)
          ?.parentElement?.children[1].classList.remove("scale-100");
      }, 1000);
      window.localStorage.setItem("errorTimer", String(timer));
      e.currentTarget.classList.add("invalidP");
      e.currentTarget.parentElement?.children[1].classList.add("scale-100");
      shakeCard();
    }
  };

  return (
    <span className='relative flex flex-col w-full text-center'>
      <motion.p
        id={`card-${card.id}-text`}
        className={
          isUpdating ? "border-b-2 border-slate-300 focus:outline-0 w-full" : ""
        }
        contentEditable={isUpdating}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        layout
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.2, duration: 1 },
        }}
      >
        {card.description}
      </motion.p>
      <span
        className='absolute text-black z-10 rounded-md bg-white py-1 px-4 -bottom-10 -right-8 shadow-md scale-0
                         transition-all duration-75 ease-in-out'
      >
        Max 450 characters long
      </span>
    </span>
  );
};

export default CardDescription;

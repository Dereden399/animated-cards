import { motion } from "framer-motion";
import React from "react";
import { CardType } from "../../App";

const CardTitle = ({
  isOpen,
  isUpdating,
  card,
  shakeCard,
  textField,
  setTextField,
}: {
  isOpen: boolean;
  isUpdating: boolean;
  card: CardType;
  shakeCard: () => Promise<void>;
  textField: string;
  setTextField: React.Dispatch<React.SetStateAction<string>>;
}) => {
  if (!isUpdating)
    return (
      <motion.h1
        className={
          isOpen ? "text-2xl text-center font-medium" : "text-lg text-center"
        }
        layout
      >
        {card.text}
      </motion.h1>
    );
  //update input for card title
  return (
    <span className='w-[95%] relative'>
      <input
        id={`card-${card.id}-titleInput`}
        className='peer text-center w-full bg-transparent border-b-2 border-slate-300 text-3xl focus:outline-0
                invalid:text-red-400 invalid:border-red-500'
        value={textField}
        onChange={e => {
          if (e.target.value.length <= 20 && e.target.value.length >= 1)
            setTextField(e.target.value);
          else {
            const oldTimer = window.localStorage.getItem("errorTimerTitle");
            if (oldTimer) {
              clearTimeout(oldTimer);
            }
            const timer = setTimeout(() => {
              e.target.setCustomValidity("");
            }, 1000);
            window.localStorage.setItem("errorTimerTitle", String(timer));
            e.target.setCustomValidity("max 20 character long");
            shakeCard();
          }
        }}
      />
      <span
        className='absolute text-black z-10 rounded-md bg-white py-1 px-4 -bottom-10 -right-8 shadow-md scale-0 peer-invalid:scale-100
                         transition-all duration-75 ease-in-out'
      >
        Must be 1-20 characters long
      </span>
    </span>
  );
};

export default CardTitle;

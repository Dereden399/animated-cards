import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const DetailedCard = ({
  cards,
  id,
  setCardId,
}: {
  cards: string[];
  id: number;
  setCardId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <AnimatePresence>
      {id !== -1 ? (
        <div
          className='absolute flex items-center justify-center h-full w-full -m-10 top-0 z-10'
          onClick={e => setCardId(-1)}
        >
          <motion.div
            className='w-96 h-64 bg-slate-100 border-slate-200 border-[1px] flex flex-col items-center justify-center text-lg font-roboto font-normal rounded-md shadow-xl'
            layoutId={id.toString()}
          >
            {cards[id]}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};

export default DetailedCard;

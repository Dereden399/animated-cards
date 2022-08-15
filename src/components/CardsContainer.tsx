import { AnimatePresence } from "framer-motion";
import React, { forwardRef } from "react";

const CardsContainer = forwardRef<
  HTMLDivElement,
  { children?: JSX.Element | JSX.Element[] | null }
>(({ children }, ref) => {
  return (
    <div className='h-full w-full pr-[15rem] pb-[10rem]'>
      <div className='h-full w-full relative' id='card-container' ref={ref}>
        <AnimatePresence>{children}</AnimatePresence>
      </div>
    </div>
  );
});

export default CardsContainer;

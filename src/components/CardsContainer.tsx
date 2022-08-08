import { AnimatePresence, LayoutGroup } from "framer-motion";
import React from "react";

const CardsContainer = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | null;
}) => {
  return (
    <div className='flex flex-col gap-y-6 gap-x-6 max-h-[calc(100vh-3rem)] w-fit flex-wrap'>
      <LayoutGroup>
        <AnimatePresence>{children}</AnimatePresence>
      </LayoutGroup>
    </div>
  );
};

export default CardsContainer;

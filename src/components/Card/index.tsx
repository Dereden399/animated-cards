import { motion, useAnimationControls } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  DotsHorizontalIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/solid";
import { CardType } from "../../App";
import { buttonHolderVariants, cardVariants } from "./variants";
import CardTitle from "./CardTitle";
import CardDescription from "./CardDescription";
import CardButton from "./CardButton";

const Card = ({
  card,
  isDragging,
  setIsDragging,
  deleteHandler,
  updateHandler,
  setCardPosition,
}: {
  card: CardType;
  deleteHandler: (id: number) => void;
  updateHandler: (newCard: CardType) => void;
  setCardPosition: (id: number, x: number, y: number) => void;
  isDragging: boolean;
  setIsDragging: (value: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [textField, setTextField] = useState<string>(card.text);
  const [descriptionField, setDescriptionField] = useState<string>(
    card.description
  );
  const controls = useAnimationControls();
  const cardRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    controls.set("hidden");
    controls.start("open");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    cardRef.current.style.setProperty("left", `${card.x}%`);
    cardRef.current.style.setProperty("top", `${card.y}%`);
  }, [card]);

  const toggleOpen = () => {
    if (isOpen) setIsUpdating(false);
    controls.start({ scale: 1, y: 0 });
    setIsOpen(isOpen => !isOpen);
  };

  const shakeCard = async () => {
    await controls.start("shake");
    controls.start("open");
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      className={`${
        isOpen ? "w-96 h-fit min-h-[16rem] z-20" : "w-60 h-40 select-none"
      } bg-slate-100 shadow-xl rounded-md border-slate-200 border-[1px] flex flex-row
        items-center text-lg ${!isUpdating && "cursor-pointer"} p-5
        ${!isOpen && "hover:shadow-2xl"} absolute`}
      onClick={e => (isUpdating || isDragging ? null : toggleOpen())}
      transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
      variants={cardVariants}
      onHoverStart={() => {
        if (!isOpen && !isDragging)
          controls.start({ scale: 1.1, y: -8, transition: { delay: 0.1 } });
      }}
      onHoverEnd={() => {
        if (!isOpen && !isDragging) controls.start("open");
      }}
      onPanStart={() => {
        if (isOpen) return;
        controls.start({ scale: 0.9, transition: { duration: 0.1, delay: 0 } });
        setIsDragging(true);
        cardRef.current.classList.add("z-20");
      }}
      onPanEnd={(e, info) => {
        if (isOpen) return;
        setIsDragging(false);
        controls.start({ scale: 1, transition: { duration: 0.1, delay: 0 } });
        setCardPosition(card.id, info.offset.x, info.offset.y);
        cardRef.current.classList.remove("z-20");
      }}
      onPan={(e, info) => {
        if (isOpen) return;
        if (info.delta.x !== 0)
          cardRef.current.style.setProperty(
            "left",
            `calc(${card.x}% + ${info.offset.x}px)`
          );
        if (info.delta.y !== 0)
          cardRef.current.style.setProperty(
            "top",
            `calc(${card.y}% + ${info.offset.y}px)`
          );
      }}
      animate={controls}
      exit='closed'
    >
      <TitleAndDescriptionContainer isOpen={isOpen}>
        <CardTitle
          isOpen={isOpen}
          isUpdating={isUpdating}
          card={card}
          shakeCard={shakeCard}
          textField={textField}
          setTextField={setTextField}
        />
        <CardDescription
          isOpen={isOpen}
          isUpdating={isUpdating}
          card={card}
          shakeCard={shakeCard}
          descriptionField={descriptionField}
          setDescriptionField={setDescriptionField}
        />
      </TitleAndDescriptionContainer>

      <ButtonContainer isOpen={isOpen}>
        {!isUpdating ? (
          <CardButton
            handler={e => {
              setIsUpdating(true);
            }}
            icon={<DotsHorizontalIcon />}
          />
        ) : (
          <CardButton
            handler={e => {
              setIsUpdating(false);
              if (
                textField !== card.text ||
                descriptionField !== card.description
              ) {
                const newCard: CardType = {
                  text: textField,
                  description: descriptionField,
                  id: card.id,
                  x: card.x,
                  y: card.y,
                };
                updateHandler(newCard);
              }
            }}
            icon={<CheckIcon className='fill-green-500' />}
          />
        )}
        {isUpdating ? (
          <CardButton
            icon={<XIcon />}
            handler={e => {
              setTextField(card.text);
              setDescriptionField(card.description);
              setIsUpdating(false);
              const el = document.getElementById(`card-${card.id}-text`);
              if (el) el.innerHTML = card.description;
            }}
          />
        ) : (
          <CardButton
            icon={<TrashIcon />}
            handler={e => {
              setIsUpdating(false);
              deleteHandler(card.id);
            }}
          />
        )}
      </ButtonContainer>
    </motion.div>
  );
};

const TitleAndDescriptionContainer = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children?: JSX.Element | JSX.Element[];
}) => {
  return (
    <motion.div
      layout
      className={`flex flex-col grow h-full items-center gap-y-5 justify-start ${
        !isOpen ? "pt-10" : ""
      }`}
    >
      {children}
    </motion.div>
  );
};

const ButtonContainer = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children?: JSX.Element | JSX.Element[];
}) => {
  if (!isOpen) return null;
  return (
    <motion.div
      className='flex flex-col gap-y-2 justify-start self-start'
      layout
      variants={buttonHolderVariants}
      initial='closed'
      animate='open'
      exit='closed'
    >
      {children}
    </motion.div>
  );
};

export default Card;

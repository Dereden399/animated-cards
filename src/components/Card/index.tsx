import { motion, useAnimationControls } from "framer-motion";
import React, { useEffect, useState } from "react";
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
  deleteHandler,
  updateHandler,
}: {
  card: CardType;
  deleteHandler: (id: number) => void;
  updateHandler: (newCard: CardType) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [textField, setTextField] = useState<string>(card.text);
  const [descriptionField, setDescriptionField] = useState<string>(
    card.description
  );
  const controls = useAnimationControls();

  useEffect(() => {
    controls.set("hidden");
    controls.start("open");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      layout
      className={`${
        isOpen ? "w-96 h-fit min-h-[16rem]" : "w-60 h-40"
      } bg-slate-100 shadow-xl rounded-md border-slate-200 border-[1px] flex flex-row
        items-center text-lg ${!isUpdating && "cursor-pointer"} p-5
        ${!isOpen && "hover:shadow-2xl"}`}
      onClick={e => (isUpdating ? null : toggleOpen())}
      transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
      variants={cardVariants}
      onHoverStart={() => {
        if (!isOpen)
          controls.start({ scale: 1.1, y: -8, transition: { delay: 0.1 } });
      }}
      onHoverEnd={() => {
        if (!isOpen) controls.start("open");
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

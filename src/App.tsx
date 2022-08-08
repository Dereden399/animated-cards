import { AnimatePresence, LayoutGroup } from "framer-motion";
import React, { useState } from "react";
import Card from "./components/Card";
import CardsContainer from "./components/CardsContainer";

export interface CardType {
  text: string;
  description: string;
  id: number;
}

const initialCards: Array<CardType> = [
  { text: "First", description: "", id: 1 },
  {
    text: "Second",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue, leo id facilisis ornare, sapien nibh accumsan mi, ultrices vestibulum turpis mauris ut mauris. Aliquam ac odio sollicitudin, elementum quam vitae, aliquam turpis. Donec maximus augue dolor, a maximus nunc pulvinar at. Pellentesque vitae consequat orci. In et quam at elit tempor varius in vel purus. Phasellus et volutpat ex. Morbi vulputate felis et risus facilisis iaculis.",
    id: 2,
  },
  {
    text: "Third",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue, leo id facilisis ornare, sapien nibh accumsan mi, ultrices vestibulum turpis mauris ut mauris. Aliquam ac odio sollicitudin, elementum quam vitae, aliquam turpis",
    id: 3,
  },
  { text: "First", description: "Lorem ipsum dolor sit amet", id: 4 },
  { text: "First", description: "Lorem ipsum dolor sit amet", id: 5 },
  { text: "First", description: "Lorem ipsum dolor sit amet", id: 6 },
  { text: "First", description: "Lorem ipsum dolor sit amet", id: 7 },
  { text: "First", description: "Lorem ipsum dolor sit amet", id: 8 },
  { text: "First", description: "Lorem ipsum dolor sit amet", id: 9 },
  {
    text: "Third",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue, leo id facilisis ornare, sapien nibh accumsan mi, ultrices vestibulum turpis mauris ut mauris. Aliquam ac odio sollicitudin, elementum quam vitae, aliquam turpis",
    id: 10,
  },
  {
    text: "Third",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue, leo id facilisis ornare, sapien nibh accumsan mi, ultrices vestibulum turpis mauris ut mauris. Aliquam ac odio sollicitudin, elementum quam vitae, aliquam turpis",
    id: 11,
  },
  {
    text: "Third",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue, leo id facilisis ornare, sapien nibh accumsan mi, ultrices vestibulum turpis mauris ut mauris. Aliquam ac odio sollicitudin, elementum quam vitae, aliquam turpis",
    id: 12,
  },
  {
    text: "Third",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue, leo id facilisis ornare, sapien nibh accumsan mi, ultrices vestibulum turpis mauris ut mauris. Aliquam ac odio sollicitudin, elementum quam vitae, aliquam turpis",
    id: 13,
  },
];

function App() {
  const [cards, setCards] = useState<CardType[]>(initialCards);

  const deleteCard = (id: number) => {
    setCards(cards.filter(x => x.id !== id));
  };

  const updateCard = (newCard: CardType) => {
    setCards(cards.map(x => (x.id === newCard.id ? newCard : x)));
  };
  return (
    <div className='p-5 text-lg font-roboto font-normal h-screen w-screen bg-gradient-to-tr from-white to-pink-100 overflow-auto'>
      <CardsContainer>
        {cards.map(card => (
          <Card
            card={card}
            key={card.id}
            deleteHandler={deleteCard}
            updateHandler={updateCard}
          />
        ))}
      </CardsContainer>
    </div>
  );
}

export default App;

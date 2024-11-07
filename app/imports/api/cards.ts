import { SpotCard, TrickCard, GameCard } from "types/cards";
import spots from "../../../data/spots.json";
import tricks from "../../../data/tricks.json";

const Deck = (cards: GameCard[]) => ({
  cards: cards,
  shuffle: function () {
    console.log(this.cards);
  },
});

const spotCards = spots.map((spot, index) => {
  return {
    id: index,
    name: spot.name,
    type: "Spot",
    features: spot.features,
    difficulty: spot.difficulty,
  };
}) as SpotCard[];

const trickCards = tricks.map((trick, index) => {
  return {
    id: index,
    ...trick,
  };
}) as TrickCard[];

export const SpotDeck = Deck(spotCards);
export const TrickDeck = Deck(trickCards);

import { SpotCard } from "../types/cards";
import spots from "../data/spots.json";
import tricks from "../data/spots.json";

const Deck = (cards: SpotCard[]) => ({
  cards: cards,
  shuffle: function () {
    console.log(this.cards);
  },
});

const spotCards = Object.keys(spots).map((key, index) => {
  const spot = spots[key];
  return {
    id: index,
    name: key,
    ...spot,
  };
}) as SpotCard[];

const trickCards = Object.keys(tricks).map((key, index) => {
  const trick = tricks[key];
  return {
    id: index,
    name: key,
    ...trick,
  };
}) as SpotCard[];

export const SpotDeck = Deck(spotCards);
export const TrickDeck = Deck(trickCards);

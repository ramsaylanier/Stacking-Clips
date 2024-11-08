import spots from "../data/spots.json";
import tricks from "../data/tricks.json";
import { CardType } from "/types/cards";

export const spotCards = spots.map((spot, index) => {
  return {
    id: index,
    name: spot.name,
    type: CardType.Spot,
    features: spot.features,
    difficulty: spot.difficulty,
  };
});

export const trickCards = tricks.map((trick, index) => {
  return {
    id: index,
    ...trick,
  };
});

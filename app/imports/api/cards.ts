import spots from "../data/spots.json";
import trickData from "../data/tricks.json";
import gearData from "../data/gear.json";
import skaterData from "../data/skaters.json";
import { CardType, GearCard,, TrickCard } from "/types/cards";
import { shuffle } from "lodash";


const HAND_SIZE = 7;

export const spotCards = () =>
  spots.map((spot, index) => {
    return {
      id: index,
      name: spot.name,
      type: CardType.Spot,
      features: spot.features.map((feature) => ({
        type: feature,
      })),
      difficulty: spot.difficulty,
    };
  });
export const trickCards = (): TrickCard[] => {
  const cards = [] as TrickCard[];

  trickData.cards.forEach((card, index) => {
    const count: number = trickData.counts[card.name];

    for (let i = 0; i < count; i++) {
      cards.push({
        id: index,
        type: CardType.Trick,
        name: card.name,
        score: card.score,
        trickType: card.type,
      });
    }
  });

  return cards;
};
const gearCards = (): GearCard[] => {
  const cards: GearCard[] = [];

  gearData.cards.forEach((card, index) => {
    const count = gearData.counts[card.name];

    for (let i = 0; i < count; i++) {
      cards.push({
        id: index,
        type: CardType.Gear,
        name: card.name,
        price: card.price,
        description: card.description,
      });
    }
  });

  return cards;
};

export const SpotDeck = () => {
  return [...spotCards()];
};

export const PlayerDeck = () => {
  return [...trickCards(), ...gearCards()];
};

export const SkaterCards = () => {
  return Object.keys(skaterData).map(skaterName => {
    const skater = skaterData[skaterName];
    return {
      ...skater,
      type: CardType.Skater,
      name: skaterName,
    }
  })
}

type ShuffleDeck = <CardType>(deck: CardType[]) => CardType[];

export const shuffleDeck: ShuffleDeck = deck => shuffle(deck);
export const dealPlayerHand = playerDeck => playerDeck.splice(0, HAND_SIZE);



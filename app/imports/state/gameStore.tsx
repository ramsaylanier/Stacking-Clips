import React from "react";
import { cast, getSnapshot, Instance, types } from "mobx-state-tree";
import { Card, CardType, FeatureType } from "/types/cards";
import { shuffle } from "lodash";
import { useParams } from "react-router";
import spots from "../data/spots.json";
import { Meteor } from "meteor/meteor";

// CARDS
const Card = types.model("Card", {
  id: types.number,
  name: types.string,
  type: types.enumeration<CardType>("CardType", Object.values(CardType)),
});

const Feature = types.model("Feature", {
  type: types.enumeration<FeatureType>(
    "FeatureType",
    Object.values(FeatureType)
  ),
});

const Spot = types.model("Spot", {
  features: types.array(Feature),
  difficulty: types.number,
});

const SpotCard = types.compose(Card, Spot);

// DECKS

const SpotDeck = types
  .model("SpotDeck", {
    gameId: types.string,
    cards: types.array(SpotCard),
  })
  .actions((self) => ({
    shuffle() {
      console.log("shuffle");
      console.log(getSnapshot(self.cards));
      self.cards = cast(shuffle(self.cards));
    },
  }));

export const GameStore = types
  .model("GameStore", {
    id: types.string,
    spotDeck: SpotDeck,
    spots: types.array(SpotCard),
  })
  .actions((self) => ({
    startGame() {
      self.spotDeck.shuffle();
      Meteor.call("startGame", self.id);
    },
    resetGame() {
      self.spotDeck.shuffle();
      Meteor.call("resetGame", self.id);
    },
  }));

export interface IGameStore extends Instance<typeof GameStore> {}

export const GameStoreContext = React.createContext<IGameStore | null>(null);

export const GameStoreProvider = (props: React.PropsWithChildren) => {
  const { gameId } = useParams();

  if (!gameId) {
    throw new Error("gameId is required");
  }

  const spotCards = spots.map((spot, index) => {
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

  console.log({ gameId });

  const store = React.useMemo(() => {
    const spotDeck = SpotDeck.create({ gameId, cards: spotCards });

    return GameStore.create({
      id: gameId,
      spotDeck,
    });
  }, []);

  return (
    <GameStoreContext.Provider value={store}>
      {props.children}
    </GameStoreContext.Provider>
  );
};

export default function useGameStore() {
  const store = React.useContext(GameStoreContext);

  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return store;
}

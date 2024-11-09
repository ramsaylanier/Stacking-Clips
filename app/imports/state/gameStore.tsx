import React from "react";
import { cast, destroy, Instance, SnapshotOut, types } from "mobx-state-tree";
import { Card, CardType, TrickCard, FeatureType } from "/types/cards";
import { shuffle } from "lodash";
import { useParams } from "react-router";
import spots from "../data/spots.json";
import trickData from "../data/tricks.json";
import { Meteor } from "meteor/meteor";
import { Game } from "../api/games/games";

const HAND_SIZE = 7;

// CARDS

const Card = types.model("Card", {
  id: types.identifierNumber,
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

const Trick = types.model("Trick", {
  name: types.string,
  score: types.number,
});

const Gear = types.model({
  name: types.string,
});

const Crew = types.model({
  name: types.string,
});

const SpotCard = types.compose(Card, Spot);
export interface ISpotCard extends Instance<typeof SpotCard> {}
export interface ISpotCardSnapshot extends SnapshotOut<typeof SpotCard> {}

const TrickCard = types.compose(Card, Trick);
export interface ITrickCard extends Instance<typeof TrickCard> {}
export interface ITrickCardSnapshot extends SnapshotOut<typeof TrickCard> {}

const GearCard = types.compose(Card, Gear);
export interface IGearCard extends Instance<typeof GearCard> {}
export interface IGearCardSnapshot extends SnapshotOut<typeof GearCard> {}

const CrewCard = types.compose(Card, Crew);
export interface ICrewCard extends Instance<typeof CrewCard> {}
export interface ICrewCardSnapshot extends SnapshotOut<typeof CrewCard> {}

export const PlayerCard = types.union(TrickCard, GearCard, CrewCard);

// DECKS

const PlayerDeck = types
  .model("PlayerDeck", {
    gameId: types.string,
    cards: types.array(PlayerCard),
  })
  .actions((self) => ({
    shuffle() {
      self.cards = cast(shuffle(self.cards));
    },
    deal() {
      return self.cards.splice(0, HAND_SIZE);
    },
  }));
export interface IPlayerDeck extends Instance<typeof PlayerDeck> {}
export interface IPlayerDeckSnapshot extends SnapshotOut<typeof PlayerDeck> {}

const SpotDeck = types
  .model("SpotDeck", {
    gameId: types.string,
    cards: types.array(SpotCard),
  })
  .actions((self) => ({
    shuffle() {
      self.cards = cast(shuffle(self.cards));
    },
  }));

// GAME STORE

const Player = types.model("Player", {
  _id: types.identifier,
  name: types.string,
  score: types.number,
  hand: types.array(types.reference(PlayerCard)),
});

export interface IPlayer extends Instance<typeof Player> {}
export interface IPlayerSnapshot extends SnapshotOut<typeof Player> {}

export const GameStore = types
  .model("GameStore", {
    id: types.string,
    spotDeck: SpotDeck,
    playerDeck: PlayerDeck,
    spots: types.array(types.reference(SpotCard)),
    players: types.array(Player),
    hydrated: false,
  })
  .actions((self) => ({
    startGame() {
      // CREATE SPOTS
      self.spotDeck.shuffle();
      const spots = self.spotDeck.cards.slice(0, 3);
      self.spots = cast(spots.map((s) => s.id));

      // DEAL PLAYER HANDS
      self.playerDeck.shuffle();
      self.players.forEach((player, index) => {
        const hand = self.playerDeck.deal();
        Meteor.call("dealPlayerHand", self.id, player._id, hand);
      });

      Meteor.call("startGame", self.id, spots);
    },
    resetGame() {
      self.spotDeck.shuffle();
      Meteor.call("resetGame", self.id);
    },
    endGame() {
      Meteor.call("endGame", self.id);
      destroy(self);
    },
    hydrateGame(game: Game) {
      self.hydrated = true;
      self.spots = cast(game.spots.map((s) => s.id));
      self.players = game.players.map((p) => {
        const hand = p.hand.map((c) => c.id);
        const player = Player.create({ ...p, hand });
        return player;
      });
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

  const trickCards = React.useMemo<TrickCard[]>(() => {
    const cards: TrickCard[] = [];

    trickData.cards.forEach((card, index) => {
      const count = trickData.counts[card.name];

      for (let i = 0; i < count; i++) {
        cards.push({
          id: index,
          type: CardType.Trick,
          name: card.name,
          score: card.score,
        });
      }
    });

    return cards;
  }, []);

  const store = React.useMemo(() => {
    const spotDeck = SpotDeck.create({ gameId, cards: spotCards });
    const playerDeck = PlayerDeck.create({ gameId, cards: trickCards });

    return GameStore.create({
      id: gameId,
      playerDeck,
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

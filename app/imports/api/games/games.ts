import { Mongo } from "meteor/mongo";
import { SpotCard, TrickCard } from "/types/cards";

export interface Deck<CardType> {
  cards: CardType[];
  shuffle: () => void;
}

export interface Player {
  _id: string;
  name: string;
  score: number;
  clips: string[];
  hand: TrickCard[];
}

export interface Game {
  _id?: string;
  code: string;
  createdAt: Date;
  playerIds: string[];
  players: Player[];
  status: "waiting" | "playing" | "finished";
  host: string;
  spots: SpotCard[];
}

export const GamesCollection = new Mongo.Collection<Game>("games");

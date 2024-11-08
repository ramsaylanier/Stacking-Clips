import { Mongo } from "meteor/mongo";
import { SpotCard } from "/types/cards";

export interface Deck<CardType> {
  cards: CardType[];
  shuffle: () => void;
}

export interface Player {
  _id: string;
  name: string;
  score: number;
  clips: string[];
}

export interface Game {
  _id?: string;
  code: string;
  createdAt: Date;
  players: string[];
  status: "waiting" | "playing" | "finished";
  host: string;
  spots: SpotCard[];
}

export const GamesCollection = new Mongo.Collection<Game>("games");

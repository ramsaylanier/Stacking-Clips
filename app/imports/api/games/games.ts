import { Mongo } from "meteor/mongo";
import { SkaterCard, SpotCard, TrickCard } from "/types/cards";

export interface Deck<CardType> {
  cards: CardType[];
  shuffle: () => void;
}

export interface Player {
  _id: string;
  userId: string;
  gameId: string;
  name: string;
  score: number;
  clips: string[];
  hand: TrickCard[];
  ready: boolean;
  skaterCard: SkaterCard | null;
}

export interface Game {
  _id: string;
  code: string;
  createdAt: Date;
  playerIds: string[];
  status: "waiting" | "playing" | "finished";
  host: string;
  spots: SpotCard[];
}

export const PlayersCollection = new Mongo.Collection<Player>("players");
export const GamesCollection = new Mongo.Collection<Game>("games");

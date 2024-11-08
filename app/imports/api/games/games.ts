import { Mongo } from "meteor/mongo";

export interface Game {
  _id?: string;
  code: string;
  createdAt: Date;
  players: string[];
  status: "waiting" | "playing" | "finished";
  host: string;
}

export const GamesCollection = new Mongo.Collection<Game>("games");

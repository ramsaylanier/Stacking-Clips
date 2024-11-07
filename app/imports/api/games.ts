import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export interface Game {
  _id?: string;
  code: string;
  createdAt: Date;
}

export const GamesCollection = new Mongo.Collection<Game>("games");

Meteor.methods({
  createGame() {
    const code = Math.random().toString(36).slice(-5);
    console.log({ code });
    return GamesCollection.insertAsync({
      code: code,
      createdAt: new Date(),
    });
  },
  async joinGame(code: string) {
    const userId = this.userId;
    console.log({ userId, code });

    const game = await GamesCollection.findOneAsync({ code: code });
    console.log({ game });
  },
});

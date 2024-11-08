import { Meteor } from "meteor/meteor";
import { GamesCollection } from "../games";

export default Meteor.methods({
  createGame() {
    const code = Math.random().toString(36).slice(-5);

    if (!this.userId) throw new Meteor.Error("not-authorized");

    return GamesCollection.insertAsync({
      code: code,
      players: [],
      status: "waiting",
      createdAt: new Date(),
      host: this.userId,
    });
  },
  async joinGame(code: string) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error("not-authorized");
    }

    const game = await GamesCollection.findOneAsync({ code: code });

    if (!game) {
      throw new Error("game-not-found");
    }

    if (game.status !== "waiting") {
      throw new Error("game-not-waiting");
    }

    if (game.players.includes(userId)) {
      return game;
    }

    await GamesCollection.updateAsync(
      { _id: game._id },
      { $push: { players: userId } }
    );

    return game;
  },
  async startGame(gameId: string) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error("not-authorized");
    }

    const game = await GamesCollection.updateAsync(
      { _id: gameId, host: userId },
      { $set: { status: "playing" } }
    );

    if (!game) {
      throw new Meteor.Error("game-not-found");
    }

    return game;
  },
  async resetGame(gameId: string) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error("not-authorized");
    }

    const game = await GamesCollection.updateAsync(
      { _id: gameId, host: userId },
      { $set: { status: "waiting" } }
    );

    if (!game) {
      throw new Meteor.Error("game-not-found");
    }

    return game;
  },
});

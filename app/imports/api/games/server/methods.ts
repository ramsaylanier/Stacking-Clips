import { Meteor } from "meteor/meteor";
import { GamesCollection, Player } from "../games";
import { SpotCard } from "/types/cards";

export default Meteor.methods({
  async createGame() {
    const code = Math.random().toString(36).slice(-5);
    const user = await Meteor.userAsync();

    if (!user) throw new Meteor.Error("not-authorized");

    const username = user.username;

    if (!username) throw new Meteor.Error("username-not-set");

    const player: Player = {
      _id: user._id,
      name: username,
      score: 0,
      clips: [],
      hand: [],
    };

    return GamesCollection.insertAsync({
      code: code,
      playerIds: [user._id],
      players: [player],
      status: "waiting",
      createdAt: new Date(),
      host: user._id,
      spots: [],
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

    const user = await Meteor.users.findOneAsync({ _id: userId });

    if (!user) {
      throw new Error("user-not-found");
    }

    if (!game.playerIds.includes(userId)) {
      const player = {
        _id: userId,
        name: user.username,
        score: 0,
        clips: [],
        hand: [],
      };

      await GamesCollection.updateAsync(
        { _id: game._id },
        { $push: { playerIds: userId, players: player } }
      );
    }

    return game;
  },
  async startGame(gameId: string, spots: SpotCard[]) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error("not-authorized");
    }

    const game = await GamesCollection.updateAsync(
      { _id: gameId, host: userId },
      { $set: { status: "playing", spots: spots } }
    );

    if (!game) {
      throw new Meteor.Error("game-not-found");
    }

    return game;
  },
  async endGame(gameId: string) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error("not-authorized");
    }

    const game = await GamesCollection.updateAsync(
      { _id: gameId, host: userId },
      { $set: { status: "finished" } }
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
      { $set: { status: "waiting", spots: [] } }
    );

    if (!game) {
      throw new Meteor.Error("game-not-found");
    }

    return game;
  },
  async leaveGame(gameId: string) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error("not-authorized");
    }

    const game = await GamesCollection.findOneAsync({ _id: gameId });

    if (!game) {
      throw new Error("game-not-found");
    }

    if (game.playerIds.includes(userId)) {
      await GamesCollection.updateAsync(
        { _id: game._id },
        { $pull: { playerIds: userId, players: { _id: userId } } }
      );
    }

    return game;
  },
  async dealPlayerHand(gameId, playerId, hand) {
    return await GamesCollection.updateAsync(
      { _id: gameId, "players._id": playerId },
      { $set: { "players.$.hand": hand } }
    );
  },
});

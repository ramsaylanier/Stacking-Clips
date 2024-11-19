import { Meteor } from "meteor/meteor";
import { GamesCollection, PlayersCollection } from "../games";
import { dealPlayerHand, PlayerDeck, shuffleDeck, SpotDeck } from "../../cards";
import { SkaterCard } from "/types/cards";

const newGame = () => {
  const spotDeck = shuffleDeck(SpotDeck());
  const playerDeck = shuffleDeck(PlayerDeck());
  const spots = spotDeck.slice(0, 3);

  return { spotDeck, playerDeck, spots };
};

export default Meteor.methods({
  async createGame() {
    const code = Math.random().toString(36).slice(-5);
    const user = await Meteor.userAsync();

    if (!user) throw new Meteor.Error("not-authorized");

    const username = user.username;

    if (!username) throw new Meteor.Error("username-not-set");

    const gameId = await GamesCollection.insertAsync({
      code: code,
      playerIds: [user._id],
      status: "waiting",
      createdAt: new Date(),
      host: user._id,
      spots: [],
    });

    const playerId = await PlayersCollection.insertAsync({
      userId: user._id,
      gameId: gameId,
      name: username,
      score: 0,
      clips: [],
      hand: [],
      ready: false,
      skaterCard: null,
    });

    return { gameId, playerId };
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

    if (!user || !user.username) {
      throw new Error("user-not-found");
    }

    if (!game.playerIds.includes(userId)) {
      await PlayersCollection.insertAsync({
        userId: user._id,
        gameId: game._id,
        name: user.username,
        score: 0,
        clips: [],
        hand: [],
        ready: false,
        skaterCard: null,
      });

      await GamesCollection.updateAsync(
        { _id: game._id },
        { $push: { playerIds: userId } }
      );
    }

    return game;
  },
  async readyPlayer(gameId: string) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error("not-authorized");
    }

    const player = await PlayersCollection.findOneAsync({
      userId: userId,
      gameId: gameId,
    });

    if (!player) {
      throw new Meteor.Error("player-not-found");
    }

    return PlayersCollection.updateAsync(
      { userId: userId, gameId: gameId },
      { $set: { ready: !player.ready } }
    );
  },
  async playerSelectSkater(gameId: string, skaterCard: SkaterCard) {
    const userId = this.userId;
    if (!userId) {
      throw new Meteor.Error("not-authorized");
    }

    const player = await PlayersCollection.findOneAsync({
      userId: userId,
      gameId: gameId,
    });

    if (!player) {
      throw new Meteor.Error("player-not-found");
    }

    return PlayersCollection.updateAsync(
      { userId, gameId: gameId },
      { $set: { skaterCard: skaterCard } }
    );
  },
  async startGame(gameId: string) {
    const userId = this.userId;
    if (!userId) {
      throw new Meteor.Error("not-authorized");
    }

    const { spotDeck, playerDeck, spots } = newGame();

    const players = await PlayersCollection.find({ gameId: gameId }).fetch();

    players.forEach(async (player) => {
      console.log({ player });

      PlayersCollection.updateAsync(
        { _id: player._id },
        { $set: { hand: dealPlayerHand(playerDeck) } }
      );
    });

    const game = await GamesCollection.updateAsync(
      { _id: gameId, host: userId },
      { $set: { status: "playing", spotDeck, playerDeck, spots } }
    );

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

    const { spotDeck, playerDeck, spots } = newGame();

    const game = await GamesCollection.updateAsync(
      { _id: gameId, host: userId },
      { $set: { status: "waiting", spotDeck, playerDeck, spots } }
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
      await PlayersCollection.removeAsync({ userId: userId, gameId: gameId });
      await GamesCollection.updateAsync(
        { _id: game._id },
        { $pull: { playerIds: userId } }
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

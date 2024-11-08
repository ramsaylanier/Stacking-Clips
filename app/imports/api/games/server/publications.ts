import { Meteor } from "meteor/meteor";
import { GamesCollection } from "../games";

console.log("IS SERVER");

Meteor.publish("games", function () {
  return GamesCollection.find();
});

Meteor.publish("game", async function (gameId: string) {
  if (!this.userId) {
    throw new Meteor.Error("not-authorized");
  }

  const game = await GamesCollection.findOneAsync({ _id: gameId });

  if (!game) {
    throw new Meteor.Error("game-not-found");
  }

  return GamesCollection.find({ _id: gameId });
});

Meteor.publish("gamePlayers", async function (gameId: string) {
  const game = await GamesCollection.findOneAsync({ _id: gameId });

  if (!game) {
    throw new Meteor.Error("game-not-found");
  }

  return Meteor.users.find(
    { _id: { $in: game.players } },
    { fields: { username: 1 } }
  );
});

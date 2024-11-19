import { Meteor } from "meteor/meteor";
import { GamesCollection, PlayersCollection } from "./games";

Meteor.publish("gameLobby", function () {
  if (!this.userId) {
    return;
  }
  return GamesCollection.find({
    $or: [{ playerIds: this.userId }, { host: this.userId }],
  });
});

Meteor.publish("games", function () {
  return GamesCollection.find();
});

Meteor.publish("game", async function (gameId: string) {
  return GamesCollection.find({ _id: gameId });
});

Meteor.publish("players", async function (gameId: string) {
  return PlayersCollection.find({ gameId: gameId });
});

Meteor.publish("player", async function (gameId: string) {
  if (!this.userId) {
    return;
  }

  return PlayersCollection.find({ gameId: gameId, userId: this.userId });
});

Meteor.publish("gameClient", async function (gameId: string) {
  if (!this.userId) return;

  return [
    GamesCollection.find({ _id: gameId, playerIds: this.userId }),
    PlayersCollection.find({ gameId: gameId }),
  ];
});

Meteor.publish("gamePlayers", async function (playerIds: string[]) {
  return Meteor.users.find(
    { _id: { $in: playerIds } },
    { fields: { username: 1 } }
  );
});

import { Meteor } from "meteor/meteor";
import { GamesCollection } from "./games";

Meteor.publish("games", function () {
  return GamesCollection.find();
});

Meteor.publish("game", async function (gameId: string) {
  return GamesCollection.find({ _id: gameId });
});

Meteor.publish("gamePlayers", async function (playerIds: string[]) {
  return Meteor.users.find(
    { _id: { $in: playerIds } },
    { fields: { username: 1 } }
  );
});

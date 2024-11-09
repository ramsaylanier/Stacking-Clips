import { Meteor } from "meteor/meteor";
import { GamesCollection } from "./games";

Meteor.publish("games", function () {
  return GamesCollection.find();
});

Meteor.publish("game", async function (gameId: string) {
  return GamesCollection.find({ _id: gameId });
});

Meteor.publish("gameClient", async function (gameId: string) {
  if (!this.userId) return;

  return GamesCollection.find(
    { _id: gameId, "players._id": this.userId },
    {
      fields: {
        players: { $elemMatch: { _id: this.userId } },
        code: 1,
        status: 1,
      },
    }
  );
});

Meteor.publish("gamePlayers", async function (playerIds: string[]) {
  return Meteor.users.find(
    { _id: { $in: playerIds } },
    { fields: { username: 1 } }
  );
});

import { Meteor } from "meteor/meteor";
import { GamesCollection } from "/imports/api/games";

Meteor.startup(async () => {
  Meteor.publish("games", function () {
    return GamesCollection.find();
  });

  Meteor.publish("game", function (gameId: string) {
    console.log({ gameId });
    return GamesCollection.find({ _id: gameId });
  });
});

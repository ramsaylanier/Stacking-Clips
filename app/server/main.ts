import { Meteor } from "meteor/meteor";
import { userMethods } from "/imports/api/user";

import "/imports/api/games/server/methods";
import "../imports/api/games/publications";
import { GamesCollection } from "/imports/api/games/games";

Meteor.methods({ ...userMethods });

export const resetGames = async () => {
  const games = await GamesCollection.find().fetch();

  if (games.length > 0) {
    GamesCollection.removeAsync({});
  }
};

Meteor.startup(async () => {
  // resetGames();
});

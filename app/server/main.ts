import { Meteor } from "meteor/meteor";
import { userMethods } from "/imports/api/user";

import "/imports/api/games/server/methods";
import "/imports/api/games/server/publications";

Meteor.methods({ ...userMethods });

Meteor.startup(async () => {});

import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

const userMethods = {
  async registerUser(
    this: Meteor.MethodThisType,
    username: string,
    password: string
  ) {
    const user = await Accounts.createUserAsync({
      username,
      password,
    });

    return user;
  },
  async deleteUser(this: Meteor.MethodThisType, user: Meteor.User) {
    if (this.userId) {
      const currentUser = await Meteor.user();

      if (currentUser?.profile?.roles.includes("admin")) {
        await Meteor.users.removeAsync({ _id: user._id });
        return true;
      } else {
        throw new Error("Not admin.");
      }
    }
  },

  async userAddEmail(this: Meteor.MethodThisType, email: string) {
    if (this.userId) {
      await Accounts.addEmailAsync(this.userId, email, false);
      return true;
    }

    return null;
  },
  async userRemoveEmail(this: Meteor.MethodThisType, email: string) {
    if (this.userId) {
      await Accounts.removeEmail(this.userId, email);
      return true;
    }

    return null;
  },
  async setUsername(this: Meteor.MethodThisType, username: string) {
    if (this.userId) {
      await Accounts.setUsername(this.userId, username);
      return true;
    }

    return null;
  },
  async setUserUsername(
    this: Meteor.MethodThisType,
    userId: string,
    username: string
  ) {
    if (this.userId) {
      const currentUser = await Meteor.user();
      if (!currentUser?.profile?.roles.includes("admin")) {
        throw new Error("Must have the admin role to perform this action.");
      } else {
        await Accounts.setUsername(userId, username);
        return true;
      }
    }

    return null;
  },
};

export { userMethods };

import React from "react";
import { Meteor } from "meteor/meteor";

export default function CreateGameButton() {
  return (
    <button onClick={() => Meteor.callAsync("createGame")}>Create Game</button>
  );
}

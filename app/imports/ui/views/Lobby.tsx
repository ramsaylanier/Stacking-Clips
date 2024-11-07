import React from "react";
import GameList from "../GameList";
import CreateGameButton from "../CreateGameButton";
import "./lobby.css";
import JoinGameForm from "../JoinGameForm";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";

export default function Lobby() {
  const user = Meteor.userId;

  console.log({ user });

  if (!user) {
    return <Link to="/login">Login</Link>;
  }

  return (
    <main>
      <CreateGameButton />
      <JoinGameForm />
      <GameList />
    </main>
  );
}

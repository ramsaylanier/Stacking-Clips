import React from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Game, GamesCollection } from "../api/games/games";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import VStack from "./components/VStack";

export default function GameList() {
  useSubscribe("games");

  const games = useTracker<Game[]>(() =>
    GamesCollection.find(
      {
        status: { $ne: "finished" },
        host: Meteor.userId() || "",
      },
      { sort: { status: -1 } }
    ).fetch()
  );

  if (!Meteor.userId()) {
    return null;
  }

  return (
    <VStack className="game-list" style={{ padding: "1rem" }}>
      {games.map((game) => {
        return (
          <Link key={game._id} to={`/game/${game._id}`}>
            Game: {game.code} - {game.status}
          </Link>
        );
      })}
    </VStack>
  );
}

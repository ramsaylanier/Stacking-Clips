import React from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Game, GamesCollection } from "../api/games/games";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export default function GameList() {
  useSubscribe("games");

  const games = useTracker<Game[]>(() =>
    GamesCollection.find({
      status: "waiting",
      host: Meteor.userId() || "",
    }).fetch()
  );

  if (!Meteor.userId()) {
    return null;
  }

  return (
    <div className="game-list">
      {games.map((game) => {
        return (
          <Link key={game._id} to={`/game/${game._id}`}>
            Game: {game.code}
          </Link>
        );
      })}
    </div>
  );
}

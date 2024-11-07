import React from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Game, GamesCollection } from "../api/games";
import { Link } from "react-router-dom";

export default function GameList() {
  useSubscribe("games");
  const games = useTracker<Game[]>(() => GamesCollection.find({}).fetch());

  return (
    <div className="game-list">
      {games.map((game) => {
        return (
          <Link key={game._id} to={`/game/${game.code}`}>
            Game: {game.code}
          </Link>
        );
      })}
    </div>
  );
}

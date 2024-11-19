import React from "react";
import { Game } from "../api/games/games";
import { Link } from "react-router-dom";
import VStack from "./components/VStack";

export default function GameList(props: { games: Game[] }) {
  return (
    <VStack className="game-list" style={{ padding: "1rem" }}>
      {props.games.map((game) => {
        return (
          <Link key={game._id} to={`/game/${game._id}`}>
            Game: {game.code} - {game.status} - {game.playerIds.length} players
          </Link>
        );
      })}
    </VStack>
  );
}

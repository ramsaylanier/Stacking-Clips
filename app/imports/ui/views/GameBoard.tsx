import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useParams } from "react-router";
import { GamesCollection } from "../../api/games/games";
import { Meteor } from "meteor/meteor";
import HStack from "../components/HStack";
import VStack from "../components/VStack";

export default function GameBoard() {
  const { gameId } = useParams();
  useSubscribe("game", gameId);
  useSubscribe("gamePlayers", gameId);
  const game = useTracker(() => GamesCollection.findOne({ _id: gameId }));
  const players = useTracker(() => Meteor.users.find({}).fetch());

  if (!game) return null;

  const handleStartGame = () => {
    Meteor.call("startGame", gameId);
  };

  const handleResetGame = () => {
    Meteor.call("resetGame", gameId);
  };

  return (
    <VStack style={{ padding: "2rem" }}>
      <h2 style={{ fontSize: "4rem", margin: 0 }}>
        Game Board - {game.code} - {game.status}{" "}
      </h2>

      <HStack>
        <button onClick={handleStartGame}>Start Game</button>
        <button onClick={handleResetGame}>Reset Game</button>
      </HStack>

      <HStack>
        {players.map((player) => {
          return <p>{player.username}</p>;
        })}
      </HStack>
    </VStack>
  );
}

import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useParams } from "react-router";
import { GamesCollection } from "../../api/games/games";
import { Meteor } from "meteor/meteor";

export default function GameBoard() {
  const { gameId } = useParams();
  useSubscribe("game", gameId);
  useSubscribe("gamePlayers", gameId);
  const game = useTracker(() => GamesCollection.findOne({ _id: gameId }));
  const players = useTracker(() => Meteor.users.find({}).fetch());

  console.log({ game, players });

  console.log("STATUS", game?.status);

  if (!game) return null;

  const handleStartGame = () => {
    Meteor.call("startGame", gameId);
  };

  const handleResetGame = () => {
    Meteor.call("resetGame", gameId);
  };

  return (
    <div style={{ padding: "0em 2em" }}>
      <h2 style={{ fontSize: "4rem", margin: 0 }}>Game Board - {game.code}</h2>

      <button onClick={handleStartGame}>Start Game</button>

      <button onClick={handleResetGame}>Rest Game</button>

      {players.map((player) => {
        return <p>{player.username}</p>;
      })}
    </div>
  );
}

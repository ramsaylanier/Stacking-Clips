import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useParams } from "react-router";
import { GamesCollection } from "/imports/api/games";

export default function Game() {
  const { gameId } = useParams();
  useSubscribe("game", gameId);

  const game = useTracker(() => GamesCollection.findOne({ _id: gameId }));

  console.log({ game });

  return (
    <div>
      <h1>Game</h1>

      <h2>Code: {game?.code}</h2>
    </div>
  );
}

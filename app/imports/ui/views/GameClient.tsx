import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useParams } from "react-router";
import { GamesCollection } from "../../api/games/games";

export default function GameClient() {
  const { gameId } = useParams();
  useSubscribe("game", gameId);

  const game = useTracker(() => GamesCollection.findOne({ _id: gameId }));

  return (
    <div>
      <h2>Game Client - {game?.status}</h2>
    </div>
  );
}

import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useParams } from "react-router";
import { GamesCollection } from "../../api/games/games";
import HStack from "../components/HStack";
import VStack from "../components/VStack";
import { Meteor } from "meteor/meteor";
import PlayerActions from "../components/PlayerActions";

export default function GameClient() {
  const { gameId } = useParams();
  useSubscribe("game", gameId);
  useSubscribe("gamePlayers", gameId);

  const game = useTracker(() => GamesCollection.findOne({ _id: gameId }));

  return (
    <VStack className="game-client">
      <HStack as="header" justify="space-between">
        <h2>
          {game?.code} - {game?.status}
        </h2>

        <button onClick={() => Meteor.callAsync("leaveGame", gameId)}>
          Leave Game
        </button>
      </HStack>

      <div className="player">
        <PlayerActions />
      </div>
    </VStack>
  );
}

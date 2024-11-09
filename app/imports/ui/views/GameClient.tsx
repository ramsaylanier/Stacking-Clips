import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { GamesCollection } from "../../api/games/games";
import HStack from "../components/HStack";
import VStack from "../components/VStack";
import { Meteor } from "meteor/meteor";
import PlayerActions from "../components/PlayerActions";
import PlayerHand from "../components/PlayerHand";

export default function GameClient() {
  const { gameId } = useParams();
  useSubscribe("gameClient", gameId);
  const navigate = useNavigate();

  const game = useTracker(() => GamesCollection.findOne({ _id: gameId }));
  const player = game?.players[0];

  console.log({ game });

  return (
    <VStack className="game-client">
      <HStack as="header" justify="space-between">
        <h2>
          {game?.code} - {game?.status}
        </h2>

        <button
          onClick={() => {
            Meteor.callAsync("leaveGame", gameId);
            navigate("/");
          }}
        >
          Leave Game
        </button>
      </HStack>

      {player && (
        <VStack className="player">
          <h3 className="player-name">{player.name}</h3>
          <PlayerActions />
          <PlayerHand hand={player.hand} />
        </VStack>
      )}
    </VStack>
  );
}

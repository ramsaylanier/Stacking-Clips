import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { GamesCollection, PlayersCollection } from "../../api/games/games";
import HStack from "../components/HStack";
import VStack from "../components/VStack";
import { Meteor } from "meteor/meteor";
import PlayerActions from "../components/PlayerActions";
import PlayerHand from "../components/PlayerHand";
import PlayerSkaterSelect from "../components/PlayerSkaterSelect";

export default function GameClient() {
  const { gameId } = useParams();
  useSubscribe("player", gameId);
  useSubscribe("gameClient", gameId);

  const navigate = useNavigate();

  const [game, players] = useTracker(
    () => [
      GamesCollection.findOne({ _id: gameId }),
      PlayersCollection.find(
        { gameId },
        { fields: { name: 1, ready: 1, skaterCard: 1 } }
      ).fetch(),
    ],
    [gameId]
  );

  const player = useTracker(() =>
    PlayersCollection.findOne({ gameId: game?._id, userId: Meteor.userId() })
  );

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

      {player && game && (
        <VStack className="player" justify="space-between">
          <div style={{ padding: "1rem" }}>
            <HStack>
              <h3 className="player-name">{player.name}</h3>

              <button onClick={() => Meteor.callAsync("readyPlayer", gameId)}>
                {player.ready ? "UnReady" : "Ready"}
              </button>
            </HStack>

            {!player.ready && (
              <PlayerSkaterSelect
                game={game}
                player={player}
                players={players}
              />
            )}

            {player.ready && game?.status === "playing" && <PlayerActions />}
          </div>

          <div>
            <PlayerHand hand={player.hand} />
          </div>
        </VStack>
      )}
    </VStack>
  );
}

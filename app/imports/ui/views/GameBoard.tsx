import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useParams } from "react-router";
import { GamesCollection, PlayersCollection } from "../../api/games/games";
import HStack from "../components/HStack";
import VStack from "../components/VStack";
import useGameStore from "/imports/state/gameStore";
import SpotCard from "../components/cards/SpotCard";
import PlayersList from "../components/PlayersList";
import { Meteor } from "meteor/meteor";

export default function GameBoard() {
  const { gameId } = useParams();

  const game = useTracker(() => GamesCollection.findOne({ _id: gameId }));
  const players = useTracker(() => PlayersCollection.find({ gameId }).fetch());
  const playersReady = players.every((player) => player.ready);

  const gameStore = useGameStore();
  const playersLoading = useSubscribe("players", gameId);
  const loading = useSubscribe("game", gameId);

  const isLoading = loading() || playersLoading();

  console.log({ game, players });

  return (
    <VStack className="game-board">
      {isLoading && <p>loading...</p>}
      {game && (
        <header>
          <h2 style={{ fontSize: "4rem", margin: 0 }}>
            {game.code}-{game.status}
          </h2>
          <HStack justify="space-between">
            <HStack gap="1em">
              {game.status === "waiting" && (
                <button
                  disabled={!playersReady}
                  onClick={() => Meteor.callAsync("startGame", gameId)}
                >
                  Start Game
                </button>
              )}
              <button onClick={() => Meteor.callAsync("resetGame", gameId)}>
                Reset Game
              </button>
            </HStack>

            <button onClick={() => Meteor.callAsync("enndGame", gameId)}>
              End Game
            </button>
          </HStack>
        </header>
      )}

      <PlayersList players={players || []} />

      {game && (
        <VStack
          style={{
            flexWrap: "nowrap",
            overflow: "auto",
            width: "100%",
            padding: "1rem",
          }}
        >
          <h3 style={{ fontSize: "2em", margin: 0 }}>Spots</h3>
          <HStack
            justify="center"
            align="flex-start"
            gap="1em"
            style={{
              flexWrap: "nowrap",
              overflow: "auto",
              width: "100%",
            }}
          >
            {game.spots.map((card) => {
              return <SpotCard key={card.id} {...card} />;
            })}
          </HStack>
        </VStack>
      )}
    </VStack>
  );
}

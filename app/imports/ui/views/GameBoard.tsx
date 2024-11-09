import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useParams } from "react-router";
import { GamesCollection } from "../../api/games/games";
import HStack from "../components/HStack";
import VStack from "../components/VStack";
import useGameStore from "/imports/state/gameStore";
import { observer } from "mobx-react-lite";
import SpotCard from "../components/cards/SpotCard";
import { Meteor } from "meteor/meteor";

export default observer(function GameBoard() {
  const { gameId } = useParams();

  const game = useTracker(() => GamesCollection.findOne({ _id: gameId }));
  const players = useTracker(() =>
    Meteor.users.find({}, { fields: { username: 1 } }).fetch()
  );

  useSubscribe("game", gameId);
  useSubscribe("gamePlayers", game?.players || []);

  const gameStore = useGameStore();

  if (!game) return null;

  return (
    <VStack className="game-board">
      <header>
        <h2 style={{ fontSize: "4rem", margin: 0 }}>
          {game.code}-{game.status}
        </h2>
      </header>

      <HStack>
        <button onClick={() => gameStore.startGame()}>Start Game</button>
        <button onClick={() => gameStore.resetGame()}>Reset Game</button>
        <button onClick={() => gameStore.endGame()}>End Game</button>
      </HStack>

      <HStack>
        {players.map((player) => {
          return <p>{player.username}</p>;
        })}
      </HStack>

      <HStack
        justify="center"
        align="flex-start"
        style={{ flexWrap: "nowrap", overflow: "auto", width: "100%" }}
      >
        {gameStore.spots.map((card) => {
          return <SpotCard {...card} />;
        })}
      </HStack>
    </VStack>
  );
});

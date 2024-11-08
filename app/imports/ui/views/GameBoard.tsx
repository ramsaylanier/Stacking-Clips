import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useParams } from "react-router";
import { GamesCollection } from "../../api/games/games";
import { Meteor } from "meteor/meteor";
import HStack from "../components/HStack";
import VStack from "../components/VStack";
import useGameStore from "/imports/state/gameStore";
import { getSnapshot } from "mobx-state-tree";
import { observer } from "mobx-react-lite";

export default observer(function GameBoard() {
  const { gameId } = useParams();
  useSubscribe("game", gameId);
  useSubscribe("gamePlayers", gameId);
  const game = useTracker(() => GamesCollection.findOne({ _id: gameId }));
  const players = useTracker(() => Meteor.users.find({}).fetch());

  const gameStore = useGameStore();

  console.log(getSnapshot(gameStore));

  if (!game) return null;

  const handleStartGame = () => {
    gameStore.startGame();
  };

  const handleResetGame = () => {
    gameStore.resetGame();
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

      <HStack>
        {gameStore.spotDeck.cards.map((card) => {
          return <p>{card.name}</p>;
        })}
      </HStack>
    </VStack>
  );
});

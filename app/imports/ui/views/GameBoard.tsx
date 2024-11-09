import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { GamesCollection } from "../../api/games/games";
import HStack from "../components/HStack";
import VStack from "../components/VStack";
import useGameStore from "/imports/state/gameStore";
import { observer } from "mobx-react-lite";
import SpotCard from "../components/cards/SpotCard";
import PlayersList from "../components/PlayersList";

export default observer(function GameBoard() {
  const { gameId } = useParams();
  const gameStore = useGameStore();

  const game = useTracker(() => GamesCollection.findOne({ _id: gameId }));

  useSubscribe("game", gameId);

  useEffect(() => {
    if (game && !gameStore.hydrated) {
      gameStore.hydrateGame(game);
    }
  }, [game?.spots]);

  if (!game) return null;

  return (
    <VStack className="game-board" gap={0}>
      <header>
        <h2 style={{ fontSize: "4rem", margin: 0 }}>
          {game.code}-{game.status}
        </h2>
        <HStack justify="space-between">
          <HStack>
            {game.status === "waiting" && (
              <button onClick={() => gameStore.startGame()}>Start Game</button>
            )}
            <button onClick={() => gameStore.resetGame()}>Reset Game</button>
          </HStack>

          <button onClick={() => gameStore.endGame()}>End Game</button>
        </HStack>
      </header>

      <PlayersList players={game.players} />

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
          style={{
            flexWrap: "nowrap",
            overflow: "auto",
            width: "100%",
          }}
        >
          {gameStore.spots.map((card) => {
            return <SpotCard key={card.id} {...card} />;
          })}
        </HStack>
      </VStack>
    </VStack>
  );
});

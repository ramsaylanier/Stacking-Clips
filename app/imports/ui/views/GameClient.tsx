import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useParams } from "react-router";
import { GamesCollection } from "../../api/games/games";
import useGameStore from "/imports/state/gameStore";
import { observer } from "mobx-react-lite";
import HStack from "../components/HStack";
import SpotCard from "../components/cards/SpotCard";
import VStack from "../components/VStack";
import { Meteor } from "meteor/meteor";

export default observer(function GameClient() {
  const { gameId } = useParams();
  useSubscribe("game", gameId);
  useSubscribe("gamePlayers", gameId);
  const gameStore = useGameStore();

  const game = useTracker(() => GamesCollection.findOne({ _id: gameId }));

  return (
    <VStack className="game-client">
      <header>
        <h2>
          Client - {game?.code} - {game?.status}
        </h2>

        <button onClick={() => Meteor.callAsync("leaveGame", gameId)}>
          Leave Game
        </button>
      </header>

      <div className="player"></div>

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

import React from "react";
import VStack from "./VStack";
import { Player } from "/imports/api/games/games";

interface PlayersListProps {
  player: Player;
}

export default function PlayerInfo(props: PlayersListProps) {
  const { player } = props;
  return (
    <VStack
      key={player._id}
      align="center"
      justify="center"
      gap=".25em"
      className="player-info"
    >
      <span className="player-name">{player.name}</span>
      <span style={{ fontSize: "0.8em" }}>
        {player.ready ? "ready" : "not ready"}
      </span>
      <span>{player.skaterCard?.name}</span>
    </VStack>
  );
}

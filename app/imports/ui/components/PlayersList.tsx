import React from "react";
import HStack from "./HStack";
import VStack from "./VStack";
import { Player } from "/imports/api/games/games";
import PlayerInfo from "./PlayerInfo";

interface PlayersListProps {
  players: Player[];
}

export default function PlayersList(props: PlayersListProps) {
  return (
    <VStack gap={0} className="players-list">
      <h4 style={{ margin: 0, fontSize: "2em" }}>Players</h4>
      <HStack gap="0.5rem">
        {props.players.map((player) => {
          return <PlayerInfo key={player._id} player={player} />;
        })}
      </HStack>
    </VStack>
  );
}

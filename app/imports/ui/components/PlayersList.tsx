import React from "react";
import HStack from "./HStack";
import { useParams } from "react-router";

export default function PlayersList() {
  const { gameId } = useParams();

  return (
    <HStack>
      {players.map((player) => {
        return <p>{player.username}</p>;
      })}
    </HStack>
  );
}

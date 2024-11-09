import React from "react";
import HStack from "./HStack";
import PlayerCard from "./cards/PlayerCard";

interface PlayerHandProps {
  hand: any[];
}

export default function PlayerHand(props: PlayerHandProps) {
  return (
    <HStack className="player-hand" gap=".25em">
      {props.hand.map((card) => {
        return <PlayerCard key={card.id} {...card} />;
      })}
    </HStack>
  );
}

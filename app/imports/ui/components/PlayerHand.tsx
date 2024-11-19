import React from "react";
import HStack from "./HStack";
import PlayerCard from "./cards/PlayerCard";

interface PlayerHandProps {
  hand: any[];
}

export default function PlayerHand(props: PlayerHandProps) {
  return (
    <HStack className="player-hand" gap=".25em">
      {props.hand.map((card, index) => {
        return <PlayerCard key={card.id + index} {...card} />;
      })}
    </HStack>
  );
}

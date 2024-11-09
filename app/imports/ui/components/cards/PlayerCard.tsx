import React from "react";
import VStack from "../VStack";

interface SpotCardProps {
  name: string;
  score: number;
}

export default function PlayerCard(props: SpotCardProps) {
  return (
    <VStack className="player-card card" as="article" gap={0}>
      <header className="card-header">
        <h3 className="card-title">{props.name}</h3>
      </header>

      <VStack className="card-body">
        <p className="card-score">{props.score}</p>
      </VStack>
    </VStack>
  );
}

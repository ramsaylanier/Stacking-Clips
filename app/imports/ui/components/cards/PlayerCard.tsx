import React from "react";
import VStack from "../VStack";

interface PlayerCardProps {
  name: string;
  type: string;
  score?: number;
  description?: string;
}

export default function PlayerCard(props: PlayerCardProps) {
  const { type } = props;

  return (
    <VStack
      className={`player-card ${type.toLowerCase()}-card card`}
      as="article"
      gap={0}
    >
      <header className="card-header">
        <h3 className="card-title">{props.name}</h3>
      </header>

      <VStack className="card-body">
        {type === "Trick" && <p className="card-score">{props.score}</p>}

        {type === "Gear" && (
          <p className="card-description">{props.description}</p>
        )}
      </VStack>
    </VStack>
  );
}

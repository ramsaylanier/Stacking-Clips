import React from "react";
import { ISpotCard } from "/imports/state/gameStore";
import HStack from "../HStack";
import VStack from "../VStack";

interface SpotCardProps extends ISpotCard {}

export default function SpotCard(props: SpotCardProps) {
  const imageUrl = `../images/spots/${props.name
    .split(" ")
    .join("")
    .toLowerCase()}.jpg`;
  console.log({ imageUrl });

  return (
    <VStack
      className="spot-card card"
      justify="space-between"
      align="stretch"
      as="article"
      gap={0}
    >
      <header className="card-header">
        <h3 className="card-title">{props.name}</h3>
        <span className="card-badge">{props.difficulty}</span>
      </header>

      <div
        className="card-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />

      <HStack className="card-features">
        {props.features.map((feature) => {
          return (
            <span key={feature.type} className="card-feature">
              {feature.type}
            </span>
          );
        })}
      </HStack>
    </VStack>
  );
}

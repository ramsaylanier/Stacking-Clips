import React from "react";
import { ISpotCard } from "/imports/state/gameStore";

interface SpotCardProps extends ISpotCard {}

export default function SpotCard(props: SpotCardProps) {
  return (
    <div className="spot-card card">
      <h3 className="card-title">{props.name}</h3>

      {props.features.map((feature) => {
        return <span>{feature.type}</span>;
      })}
    </div>
  );
}

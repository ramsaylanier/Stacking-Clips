import React from "react";
import VStack from "../VStack";
import { type SkaterCard } from "/types/cards";

interface SkaterCardProps extends SkaterCard {
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export default function SkaterCard(props: SkaterCardProps) {
  return (
    <VStack
      className={`skater-card card ${
        props.selected ? "selected" : props.disabled ? "disabled" : ""
      }`}
      justify="space-between"
      align="stretch"
      as="article"
      gap={0}
      onClick={() => {
        if (!props.disabled) {
          props.onClick();
        }
      }}
    >
      <header className="card-header">
        <h3 className="card-title">{props.name}</h3>
      </header>

      <VStack
        className="card-body"
        justify="flex-start"
        align="flex-start"
        gap=".5em"
      >
        {Object.keys(props.tricks).map((trick) => {
          return (
            <span key={trick} className="card-feature">
              {trick}: {props.tricks[trick]}
            </span>
          );
        })}
      </VStack>
    </VStack>
  );
}

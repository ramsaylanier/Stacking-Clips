import React from "react";
import VStack from "./VStack";

const actions = [
  {
    name: "Attempt To Stack A Clip",
  },
  {
    name: "Travel To A Spot",
  },
  {
    name: "Enter A Local Contest",
  },
  {
    name: "Go Shopping",
  },
  {
    name: "Hit The Training Facility",
  },
  {
    name: "Pass",
  },
];

export default function PlayerActions() {
  return (
    <VStack gap="1rem">
      {actions.map((action) => {
        return <button key={action.name}>{action.name}</button>;
      })}
    </VStack>
  );
}

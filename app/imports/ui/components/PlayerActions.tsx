import React from "react";
import VStack from "./VStack";

const actions = [
  {
    name: "Attempt Trick",
  },
  {
    name: "Go Shopping",
  },
  {
    name: "Hit The Local",
  },
  {
    name: "Pass",
  },
];

export default function PlayerActions() {
  return (
    <VStack>
      {actions.map((action) => {
        return <button key={action.name}>{action.name}</button>;
      })}
    </VStack>
  );
}

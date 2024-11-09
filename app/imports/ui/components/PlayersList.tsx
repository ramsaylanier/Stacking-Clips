import React from "react";
import HStack from "./HStack";
import { Meteor } from "meteor/meteor";
import VStack from "./VStack";

interface PlayersListProps {
  players: Meteor.User[];
}

export default function PlayersList(props: PlayersListProps) {
  return (
    <VStack gap={0} className="players-list">
      <h4 style={{ margin: 0, fontSize: "2em" }}>Players</h4>
      <HStack>
        {props.players.map((player) => {
          return (
            <p key={player._id} className="player-name">
              {player.username}
            </p>
          );
        })}
      </HStack>
    </VStack>
  );
}

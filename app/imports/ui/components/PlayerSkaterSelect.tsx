import React from "react";
import { Game, Player } from "/imports/api/games/games";
import { SkaterCards } from "/imports/api/cards";
import SkaterCard from "./cards/SkaterCard";
import HStack from "./HStack";
import { Meteor } from "meteor/meteor";
import VStack from "./VStack";

interface PlayerSkaterSelectProps {
  player: Player;
  players: Player[];
  game: Game;
}

export default function PlayerSkaterSelect(props: PlayerSkaterSelectProps) {
  const { game } = props;

  const skaters = React.useMemo(() => {
    return SkaterCards();
  }, []);

  const usedSkaters = React.useMemo(() => {
    return props.players.map((player) => player.skaterCard?.id);
  }, [props.players]);

  return (
    <VStack>
      <p style={{ fontSize: "1em" }}>Select Your Skater</p>
      <HStack align="center" justify="center" gap="1rem">
        {skaters.map((skater) => {
          const isPlayerSelection = props.player.skaterCard?.id === skater.id;
          const isUsed = usedSkaters.includes(skater.id);

          return (
            <SkaterCard
              key={skater.name}
              {...skater}
              disabled={isUsed}
              selected={isPlayerSelection}
              onClick={() => {
                Meteor.callAsync("playerSelectSkater", game._id, skater);
              }}
            />
          );
        })}
      </HStack>
    </VStack>
  );
}

import React from "react";
import CreateGameButton from "../CreateGameButton";
import JoinGameForm from "../JoinGameForm";
import VStack from "../components/VStack";
import GameList from "../GameList";

export default function Lobby() {
  return (
    <main>
      <VStack>
        <JoinGameForm />
        <CreateGameButton />
        <GameList />
      </VStack>
    </main>
  );
}

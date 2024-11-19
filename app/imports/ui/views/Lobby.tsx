import React from "react";
import CreateGameButton from "../CreateGameButton";
import JoinGameForm from "../JoinGameForm";
import VStack from "../components/VStack";
import GameList from "../GameList";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { Game, GamesCollection } from "/imports/api/games/games";

export default function Lobby() {
  const loading = useSubscribe("gameLobby");
  const isLoading = loading();

  const games = useTracker<Game[]>(() => GamesCollection.find().fetch());

  if (isLoading) return <p>Loading...</p>;
  if (!games) return <p>No games found</p>;

  return (
    <main>
      <VStack>
        <JoinGameForm />
        <CreateGameButton />
        <GameList games={games} />
      </VStack>
    </main>
  );
}

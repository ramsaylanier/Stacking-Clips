import React from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router";

export default function CreateGameButton() {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const gameId = await Meteor.callAsync("createGame");
      navigate(`/game/${gameId}`);
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <button
      className="pixelized-text"
      style={{ fontSize: "2em" }}
      onClick={handleClick}
    >
      Create Game
    </button>
  );
}

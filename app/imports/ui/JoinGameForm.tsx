import React from "react";
import { Meteor } from "meteor/meteor";
import HStack from "./components/HStack";
import { useNavigate } from "react-router";

export default function JoinGameForm() {
  const [code, setCode] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await Meteor.callAsync("joinGame", code);

      if (res) {
        navigate(`/game/${res._id}/client`);
      }

      console.log({ res });
    } catch (err) {
      console.log({ err });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <label htmlFor="game-code">Game Code: </label>
        <input
          id="game-code"
          placeholder="Game Code"
          value={code}
          onChange={handleChange}
        />
      </HStack>

      <input type="submit" value="Join Game" className="pixelized-text" />
    </form>
  );
}

import React from "react";
import { Meteor } from "meteor/meteor";

export default function JoinGameForm() {
  const [code, setCode] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Meteor.callAsync("joinGame", code);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  console.log({ code });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="game-code">Game Code: </label>
        <input
          id="game-code"
          placeholder="Game Code"
          value={code}
          onChange={handleChange}
        />
      </div>

      <input type="submit" value="Join Game" />
    </form>
  );
}

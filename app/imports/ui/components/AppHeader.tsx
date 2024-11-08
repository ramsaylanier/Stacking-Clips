import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { Link } from "react-router-dom";
import HStack from "./HStack";

export default function AppHeader() {
  const user = useTracker(() => Meteor.user());

  return (
    <header className="app-header">
      <h1 className="title">
        <Link to="/" className="title">
          Stacking Clips
        </Link>
      </h1>

      {user && (
        <HStack>
          <p>{user.username}</p>
          <button className="logout-button" onClick={() => Meteor.logout()}>
            Logout
          </button>
        </HStack>
      )}
    </header>
  );
}

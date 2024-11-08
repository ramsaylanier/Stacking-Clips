import React, { useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { Outlet, useNavigate } from "react-router";
import AppHeader from "../components/AppHeader";
import { useTracker } from "meteor/react-meteor-data";

export default function AppLayout() {
  const user = useTracker(() => Meteor.user());
  const isLogginIn = useTracker(() => Meteor.loggingIn());
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLogginIn) {
      navigate("/login");
    }
  }, [user, isLogginIn]);

  if (isLogginIn) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <AppHeader />
      <Outlet />
    </main>
  );
}

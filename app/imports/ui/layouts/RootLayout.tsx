import React from "react";
import "./layout.css";
import { Outlet } from "react-router";
import Toasts from "../components/Toasts";

export default function Lobby() {
  return (
    <>
      <Outlet />
      <Toasts />
    </>
  );
}

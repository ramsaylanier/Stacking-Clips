import React from "react";
import { Outlet } from "react-router";
import Toasts from "../components/Toasts";

export default function RootLayout() {
  return (
    <>
      <Outlet />
      <Toasts />
    </>
  );
}

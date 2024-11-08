import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AppLayout from "./layouts/AppLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import Lobby from "./views/Lobby";
import Game from "./views/GameBoard";
import GameClient from "./views/GameClient";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Lobby />,
          },
          {
            path: "/game/:gameId",
            element: <Game />,
          },
          {
            path: "/game/:gameId/client",
            element: <GameClient />,
          },
        ],
      },
    ],
  },
]);

export default router;

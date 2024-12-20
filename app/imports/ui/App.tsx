import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { StoreProvider } from "../state/store";

export const App = () => (
  <StoreProvider>
    <RouterProvider router={router} />
  </StoreProvider>
);

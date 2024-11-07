import { observer } from "mobx-react-lite";
import React from "react";
import useStore from "/client/store";
import Toast from "./Toast";

export default observer(function Toasts() {
  const store = useStore();

  return (
    <div>
      {store.toasts.map((toast, index) => (
        <Toast key={`${toast.title}-${index}`} {...toast} />
      ))}
    </div>
  );
});

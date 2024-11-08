import { observer } from "mobx-react-lite";
import React from "react";
import useStore from "../../state/store";
import Toast from "./Toast";

export default observer(function Toasts() {
  const store = useStore();

  return (
    <div className="toasts">
      {store.toasts.map((toast, index) => (
        <Toast
          key={`${toast.title}-${index}`}
          {...toast}
          onClose={() => store.removeToast(toast)}
        />
      ))}
    </div>
  );
});

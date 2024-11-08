import React from "react";
import { Instance, SnapshotOut, types } from "mobx-state-tree";

const Toast = types.model("Toast", {
  title: types.string,
  description: types.string,
  status: types.union(
    types.literal("info"),
    types.literal("warning"),
    types.literal("success"),
    types.literal("error")
  ),
  duration: types.number,
  isClosable: types.boolean,
});

export interface IToast extends Instance<typeof Toast> {}
export interface IToastSnapshot extends SnapshotOut<typeof Toast> {}

export const Store = types
  .model("Store", {
    toasts: types.array(Toast),
  })
  .actions((self) => ({
    addToast(toast: IToastSnapshot) {
      self.toasts.push(toast);
    },
    removeToast(toast: IToast) {
      self.toasts.remove(toast);
    },
  }));

export interface IStore extends Instance<typeof Store> {}

export const StoreContext = React.createContext<IStore | null>(null);

export const StoreProvider = (props: React.PropsWithChildren) => {
  const store = React.useMemo(
    () =>
      Store.create({
        toasts: [],
      }),
    []
  );

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default function useStore() {
  const store = React.useContext(StoreContext);

  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return store;
}

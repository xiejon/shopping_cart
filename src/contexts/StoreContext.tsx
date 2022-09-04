import React, { createContext, useContext, ReactNode } from "react";
import Store from "../pages/Store";

type StoreProviderProps = {
  children: ReactNode;
};

type StoreContext = {
  addToInventory: (item: StoreItem) => void;
  storeItems: StoreItem[];
};

type StoreItem = {
  _id: string;
  name: string;
  price: number;
  url: string;
};

const StoreContext = createContext({} as StoreContext);

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [storeItems, setStoreItems] = React.useState<StoreItem[]>([]);

  function addToInventory(item: StoreItem) {
    setStoreItems((prevItems) => [...prevItems, item]);
  }

  return (
    <StoreContext.Provider value={{ storeItems, addToInventory }}>
      {children}
    </StoreContext.Provider>
  );
}

import React, { createContext, useContext, ReactNode } from "react";
import Store from "../components/Store";

type StoreProviderProps = {
  children: ReactNode;
};

type StoreContext = {
  addToInventory: (item: StoreItem) => void;
  setUser: (data: UserData) => void;
  storeItems: StoreItem[];
  userInfo: UserData;
};

type StoreItem = {
  _id: string;
  name: string;
  price: number;
  url: string;
};

type UserData = {
  email: string;
  isAdmin: boolean;
  name: string;
  token: string;
  _id: string;
};

const StoreContext = createContext({} as StoreContext);

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [storeItems, setStoreItems] = React.useState<StoreItem[]>([]);
  const [userInfo, setUserInfo] = React.useState<UserData | any>(null);

  function addToInventory(item: StoreItem) {
    setStoreItems((prevItems) => [...prevItems, item]);
  }

  function setUser(data: UserData) {
    setUserInfo(data)
  }

  return (
    <StoreContext.Provider value={{ storeItems, userInfo, setUser, addToInventory }}>
      {children}
    </StoreContext.Provider>
  );
}

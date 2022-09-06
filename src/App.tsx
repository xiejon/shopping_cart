import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Home";
import Store from "./components/Store";

import SignIn from "./components/SignIn";
import { StoreProvider } from "./contexts/StoreContext";
import Account from "./components/Account";
import { useStore } from "./contexts/StoreContext";
import ShippingAddressScreen from "./components/ShippingAddressScreen";

function App() {
  const { userInfo } = useStore();
  return (
    <StoreProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/store" element={<Store />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </StoreProvider>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Home";
import Store from "./components/Store";
import { CartProvider } from "./contexts/CartContext";
import SignIn from "./components/SignIn";
import { StoreProvider } from "./contexts/StoreContext";
import Account from "./components/Account";
import { useStore } from "./contexts/StoreContext";

function App() {
  const {userInfo} = useStore()
  return (
    <StoreProvider>
      <CartProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/store" element={<Store />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </CartProvider>
    </StoreProvider>
  );
}

export default App;

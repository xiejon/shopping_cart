import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Home";
import Store from "./pages/Store";
import { CartProvider } from "./contexts/CartContext";
import SignIn from "./components/SignIn";
import { StoreProvider } from "./contexts/StoreContext";

function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/store" element={<Store />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </CartProvider>
    </StoreProvider>
  );
}

export default App;

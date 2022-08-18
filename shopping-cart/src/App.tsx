import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Home";
import Store from "./pages/Store";
import { CartProvider } from "./contexts/CartContext";

function App() {

  return (
    <CartProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./screens/Home";
import Store from "./screens/Store";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import { StoreProvider } from "./contexts/StoreContext";
import Account from "./components/Account";
import { useStore } from "./contexts/StoreContext";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethod from "./screens/PaymentMethod";
import PlaceOrder from "./screens/PlaceOrder";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistory";

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/payment" element={<PaymentMethod />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orderhistory" element={<OrderHistoryScreen />}></Route>
          <Route path="/orders/:id" element={<OrderScreen />} />
        </Routes>
      </div>
    </StoreProvider>
  );
}

export default App;

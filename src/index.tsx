import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const initialOptions = {
  "client-id": "test",
  currency: "USD",
  intent: "capture",
  "data-client-token": "abc123xyz==",
};

const stripePromise = loadStripe(
  "pk_live_51Hg7IbBKin9EvEk4k76mWX2anlkvbGnRBGB03pCi4WERzFKF5ILkAdeQBnKhZdCr0hyiDpibLLjQGXdNgrT5a3B400ghsnOzC2"
);


root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <PayPalScriptProvider deferLoading={true} options={initialOptions}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </PayPalScriptProvider>
    </BrowserRouter>
  </React.StrictMode>
);

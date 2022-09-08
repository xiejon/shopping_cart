import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
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

root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <PayPalScriptProvider deferLoading={true} options={initialOptions}>
        <App />
      </PayPalScriptProvider>
    </BrowserRouter>
  </React.StrictMode>
);

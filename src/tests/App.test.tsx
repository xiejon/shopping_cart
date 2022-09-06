import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import Navbar from "../components/Navbar";
import Store from "../components/Store";
import { BrowserRouter } from "react-router-dom" 
import { useStore } from "../contexts/StoreContext";

test("store renders 6 item imgs (+ 1 background img)", () => {
  render(<BrowserRouter><App /></BrowserRouter>);

  const storeBtn = screen.getByText("Store", { selector: 'a' })
    
  fireEvent.click(storeBtn)

  const imgs = screen.getAllByRole("img");
  expect(imgs.length).toEqual(7);
});

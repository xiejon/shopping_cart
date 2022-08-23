import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CartProvider } from '../contexts/CartContext'
import App from "../App";
import Navbar from "../components/Navbar";
import Store from "../pages/Store";
import { BrowserRouter } from "react-router-dom" 

test("store renders 6 item imgs (+ 1 background img)", () => {
  render(<BrowserRouter><App /></BrowserRouter>);

  const storeBtn = screen.getByText("Store", { selector: 'a' })
    
  fireEvent.click(storeBtn)

  const imgs = screen.getAllByRole("img");
  expect(imgs.length).toEqual(7);
});

// test("clicking on cart svg renders cart")
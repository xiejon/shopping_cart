import React from "react";
import { render, screen } from "@testing-library/react";
import Store from "../pages/Store";

test("renders 6 item imgs (+ 1 background img)", () => {
  render(<Store />);
  const imgs = screen.getAllByRole("img");
  expect(imgs.length).toEqual(7);
});

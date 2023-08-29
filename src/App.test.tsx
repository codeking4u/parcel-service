import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux"; // Import Provider
import store from "./store"; // Import your Redux store
import App from "./App";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText("Shipping App");
  expect(linkElement).toBeInTheDocument();
});

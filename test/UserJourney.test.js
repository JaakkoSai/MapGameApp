import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import App from "../App";

describe("User Journey", () => {
  it("completes the user flow from signup to logout", async () => {
    const { findByText, getByPlaceholderText, getByText } = render(<App />);

    fireEvent.press(getByText("Sign Up"));
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");
    fireEvent.press(getByText("Create Account"));

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");
    fireEvent.press(getByText("Login"));

    expect(await findByText("Welcome Home")).toBeTruthy();

    fireEvent.press(getByText("Logout"));
    expect(await findByText("You have been logged out")).toBeTruthy();
  });
});

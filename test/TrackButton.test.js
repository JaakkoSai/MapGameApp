import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TrackButton from "../components/TrackButton"; // Adjust path as necessary

describe("TrackButton", () => {
  it("toggles tracking state on press", () => {
    const { getByText } = render(<TrackButton />);
    const button = getByText("Start Tracking");
    fireEvent.press(button);
    expect(button).toHaveTextContent("Stop Tracking");
    fireEvent.press(button);
    expect(button).toHaveTextContent("Start Tracking");
  });
});

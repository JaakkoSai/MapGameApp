import React from "react";
import MapPage from "../pages/MapPage";

jest.mock("react-native-maps", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: ({ children }) => <View>{children}</View>, // Mock the MapView
    Polyline: ({ children, ...props }) => <View {...props}>{children}</View>, // Mock the Polyline
  };
});

describe("MapPage", () => {
  it("renders a polyline based on the path state", () => {
    const path = [
      { latitude: 37.78825, longitude: -122.4324 },
      { latitude: 37.78826, longitude: -122.4325 },
    ];

    const { getByTestId } = render(<MapPage />);
    const polyline = getByTestId("polyline");

    expect(polyline.props).toHaveProperty("coordinates", path);
  });
});

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

describe("Navigation Flow", () => {
  it("navigates to Home screen after login", () => {
    const component = (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const { getByText } = render(component);
    const loginButton = getByText("Login");
    fireEvent.press(loginButton);
    expect(getByText("Welcome Home")).toBeTruthy();
  });
});

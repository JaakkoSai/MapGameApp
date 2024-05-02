import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./pages/OnboardingPage";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import LoginScreen from "./pages/LoginPage";
import SignupScreen from "./pages/SignupPage";
import SettingsPage from "./pages/SettingsPage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// GoogleSignin.configure({
//   webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
// });

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Map" component={MapPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.removeItem("alreadyLaunched"); // Only for development testing
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; // Or some loading indicator
  }

  return (
    <NavigationContainer>
      {isFirstLaunch ? (
        <Stack.Navigator>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="MainApp" component={MainApp} />
        </Stack.Navigator>
      ) : (
        <MainApp />
      )}
    </NavigationContainer>
  );
}

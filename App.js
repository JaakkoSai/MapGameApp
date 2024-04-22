import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./pages/OnboardingPage";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import LoginScreen from "./pages/LoginPage";
import SignupScreen from "./pages/SignupPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCuMiE-RxfU7ztepPRZ6dWbuVd5QZnUyEA",
  authDomain: "mapapp-9f313.firebaseapp.com",
  projectId: "mapapp-9f313",
  storageBucket: "mapapp-9f313.appspot.com",
  messagingSenderId: "834274424954",
  appId: "1:834274424954:web:b279d6a385dd875b9aa3c3",
  measurementId: "G-9XK00WPPZK",
};

// init firebase
initializeApp(firebaseConfig);
getAnalytics();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Map" component={MapPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
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
    return null; // This is the case where your app is fetching the async storage data
  } else if (isFirstLaunch === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="MainApp" component={MainApp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <MainApp />;
  }
}

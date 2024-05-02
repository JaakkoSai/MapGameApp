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
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
});

const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  databaseURL: Config.FIREBASE_DATABASE_URL,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  appId: Config.FIREBASE_APP_ID,
  measurementId: Config.FIREBASE_MEASUREMENT_ID,
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

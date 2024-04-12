import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Map" component={MapPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyCuMiE-RxfU7ztepPRZ6dWbuVd5QZnUyEA",
  authDomain: "mapapp-9f313.firebaseapp.com",
  projectId: "mapapp-9f313",
  storageBucket: "mapapp-9f313.appspot.com",
  messagingSenderId: "834274424954",
  appId: "1:834274424954:web:b279d6a385dd875b9aa3c3",
  measurementId: "G-9XK00WPPZK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

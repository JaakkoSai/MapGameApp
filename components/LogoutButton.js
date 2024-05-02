import React from "react";
import { View, Button, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { CommonActions } from "@react-navigation/native";

const LogoutButton = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful, reset the navigation stack to the Login screen
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
        Alert.alert("Logged Out", "You have been successfully logged out.");
      })
      .catch((error) => {
        // An error happened.
        Alert.alert("Error", "Failed to log out. Please try again.");
        console.error("Logout failed: ", error);
      });
  };

  return (
    <View style={{ margin: 20 }}>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

export default LogoutButton;

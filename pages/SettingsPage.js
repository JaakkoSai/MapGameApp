import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LogoutButton from "../components/LogoutButton";

const SettingsPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <LogoutButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafd",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
});

export default SettingsPage;

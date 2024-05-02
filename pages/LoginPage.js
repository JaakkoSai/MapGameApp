import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import FormInput from "../components/FormInput";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = () => {
    if (email === "" || password === "") {
      Alert.alert("Please enter email and password!");
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User signed in!");
        navigation.navigate("Home"); // Assuming 'Home' is your home screen
      })
      .catch((error) => {
        console.error("Login failed:", error);
        Alert.alert(error.message);
      });
  };

  async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/Maplogo.webp")} style={styles.logo} />
      <Text style={styles.text}>Map Unlock App</Text>
      <FormInput
        labelValue={email}
        onChangeText={setEmail}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={password}
        onChangeText={setPassword}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <FormButton buttonTitle="Sign in" onPress={handleLogin} />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <SocialButton
        buttonTitle="Sign in with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {}}
      />

      <SocialButton
        buttonTitle="Sign in with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={onGoogleButtonPress}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.navButtonText}>
          Don't have an account? Sign up!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
    borderRadius: 40,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
  },
});

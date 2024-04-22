import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import FormInput from "../components/FormInput";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText={"Email"}
        iconType={"user"}
        keyboardType={"email-address"}
        autoCapitalize={"none"}
        autoCorrect={false}
      />
      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText={"Password"}
        iconType={"lock"}
        secureTextEntry={true}
      />
      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userConfirmPassword) =>
          setConfirmPassword(userConfirmPassword)
        }
        placeholderText={"Confirm Password"}
        iconType={"lock"}
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle={"Sign up"}
        onPress={() => alert("Sign up clicked!")}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our
        </Text>
        <TouchableOpacity onPress={() => alert("Terms of Service Clicked!")}>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Terms of Service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}>and</Text>
        <TouchableOpacity onPress={() => alert("Privacy Policy Clicked!")}>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      <SocialButton
        buttonTitle="Sign up with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {}}
      />

      <SocialButton
        buttonTitle="Sign up with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {}}
      />

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.navButtonText}>
          Already have an account? Sign in!
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
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    color: "grey",
    marginHorizontal: 2,
  },
});

import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const Dots = ({ selected }) => {
  let backgroundColor = selected ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.3)";

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 30 }} {...props}>
    <Text style={{ fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 30 }} {...props}>
    <Text style={{ fontSize: 16 }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 30 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);

function OnboardingPage({ navigation }) {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "#a6e4d0",
          image: <Image source={require("../assets/onboarding-img1.png")} />,
          title: "Explore",
          subtitle: "A new way to explore your environment",
        },
        {
          backgroundColor: "#fdeb93",
          image: <Image source={require("../assets/onboarding-img2.png")} />,
          title: "Track",
          subtitle: "Keep track of every place you have been to",
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../assets/onboarding-img3.png")} />,
          title: "Compete",
          subtitle: "Compete with friends & family",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OnboardingPage;

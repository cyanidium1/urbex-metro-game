import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground } from "react-native";

const Logo = () => {
  const navigation = useNavigation();
  setTimeout(() => {
    navigation.navigate("Home");
  }, 4000);
  return (
    <ImageBackground
      source={require("../src/videos/logo.gif")}
      className="flex-1"
    ></ImageBackground>
  );
};

export default Logo;

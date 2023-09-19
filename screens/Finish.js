import React from "react";
import { ImageBackground, SafeAreaView, Text } from "react-native";
import MenuButton from "./Components/MenuButton";

const Finish = () => {
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        className="flex-1"
        source={require("../src/images/777.jpg")}
      >
        <MenuButton />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Finish;

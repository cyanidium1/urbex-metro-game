import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";

function HomeScreen() {
  const [lang, chLang] = useState("en");
  const navigation = useNavigation();
  const main = require("../src/images/main-1.jpg");

  return (
    <ImageBackground className="bg-cover h-full w-full" source={main}>
      <TouchableOpacity
        className="bg-[#21252980] p-2 my-1 rounded items-center justify-center absolute top-6 left-6"
        onPress={() => {
          lang === "en" ? chLang("ru") : chLang("en");
        }}
      >
        <Text className="text-[#fcf6bd] text-xl font-bold">
          {lang === "en" ? "language: en" : "язык: рус"}
        </Text>
      </TouchableOpacity>
      <View className="flex items-center mt-40">
        <TouchableOpacity
          className="bg-[#21252980] p-2 my-1 rounded items-center"
          onPress={() => navigation.navigate("Intro", { lang: lang })}
        >
          <Text className="text-[#fcf6bd] text-xl font-bold">
            {lang === "en" ? "Play" : "Играть"}
          </Text>
        </TouchableOpacity>
        {/* <Button title="About" onPress={() => navigation.navigate("About")} /> */}
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;

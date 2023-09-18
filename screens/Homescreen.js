import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";

function Homescreen() {
  const [lang, chLang] = useState("en");
  const [plotBtn, togglePlotBtn] = useState(false);
  const navigation = useNavigation();
  const main = require("../src/images/main-1.jpg");

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <TouchableOpacity
          className="bg-[#21252980] p-2 my-1 rounded items-center justify-center absolute top-20 left-6"
          onPress={() => {
            togglePlotBtn(!plotBtn);
          }}
        >
          <Text className="text-[#fcf6bd] text-xl font-bold">
            {plotBtn
              ? lang === "en"
                ? "map:  shown"
                : "карта: показана"
              : lang === "en"
              ? "map:  hidden"
              : "карта: спрятана"}
          </Text>
        </TouchableOpacity>
        <View className="flex items-center mt-40">
          <TouchableOpacity
            className="bg-[#21252980] p-2 my-1 rounded items-center"
            onPress={() =>
              navigation.navigate("Intro", { lang: lang, plotBtn: plotBtn })
            }
          >
            <Text className="text-[#fcf6bd] text-xl font-bold">
              {lang === "en" ? "Play" : "Играть"}
            </Text>
          </TouchableOpacity>
          {/* <Button title="About" onPress={() => navigation.navigate("About")} /> */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Homescreen;

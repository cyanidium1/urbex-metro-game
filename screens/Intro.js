import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import ploten from "../src/plot/plot.json";
import plotru from "../src/plot/plotru.json";
import { useNavigation, useRoute } from "@react-navigation/core";
import { TouchableOpacity } from "react-native";

const Intro = () => {
  const {
    params: { lang },
  } = useRoute();
  let plot;
  switch (lang) {
    case "ru":
      plot = plotru;
      break;

    default:
      plot = ploten;
      break;
  }
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigation = useNavigation();

  const text = plot.intro;
  const backgroundImage = require("../src/images/intro.jpg");

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, 5);

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentIndex, text]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground className="flex-1 cover" source={backgroundImage}>
        <View className="absolute bottom-10 p-1 w-full">
          <Text className="text-white font-bold text-xl bg-[#30303080]">
            {displayText}
          </Text>
        </View>
        <View className="absolute top-2 left-2">
          <TouchableOpacity
            className="bg-[#2a2a2a80] p-1 my-1 rounded items-center justify-center"
            onPress={() => navigation.navigate("Home")}
          >
            <Text className="text-[#fcf6bd] text-base font-bold">
              {lang === "en" ? "Menu" : "Меню"}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="absolute bottom-0 right-4">
          <TouchableOpacity
            className="bg-[#2d2d2d80] p-1 my-1 rounded items-center justify-center"
            onPress={() => navigation.navigate("Game", { lang: lang })}
          >
            <Text className="text-[#fcf6bd] text-base font-bold">
              {lang === "en" ? "Next" : "Далее"}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Intro;

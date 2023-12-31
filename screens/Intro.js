import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native";
import { useSelector, useStore } from "react-redux";
import MenuButton from "./Components/MenuButton";

const Intro = () => {
  const lang = useSelector((state) => state.game.lang);
  let plot;
  switch (lang) {
    case "ru":
      plot = require("../src/plot/plotru.json");
      break;
    case "es":
      plot = require("../src/plot/plotes.json");
      break;
    case "de":
      plot = require("../src/plot/plotde.json");
      break;
    case "fr":
      plot = require("../src/plot/plotfr.json");
      break;
    case "ua":
      plot = require("../src/plot/plotua.json");
      break;
    default:
      plot = require("../src/plot/plot.json");
      break;
  }
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [zoom, updZoom] = useState(1);
  // setInterval(() => {
  //   updZoom(zoom + 0.1);
  // }, 200);

  const navigation = useNavigation();

  const text = plot.intro;
  const backgroundImage = require("../src/videos/intro.gif");

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
      <ImageBackground
        className="flex-1 cover"
        source={backgroundImage}
        // style={{ transform: [{ scale: zoom }] }}
      >
        <View className="absolute bottom-10 p-1 w-full">
          <Text className="text-white font-bold text-xl bg-[#30303080]">
            {displayText}
          </Text>
        </View>
        <MenuButton text={plot.buttons.menu} />
        <View className="absolute bottom-0 right-4">
          <TouchableOpacity
            className="bg-[#2d2d2d80] p-1 my-1 rounded items-center justify-center"
            onPress={() => navigation.navigate("Game")}
          >
            <Text className="text-[#fcf6bd] text-base font-bold">
              {plot.buttons.next}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Intro;

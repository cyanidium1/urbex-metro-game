import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native";
import { useSelector, useStore } from "react-redux";
import MenuButton from "./Components/MenuButton";
import ScnDescription from "./Components/ScnDescription";
import FindTheThing from "./Components/FindTheThing";
import HiddenBtns from "./Components/HiddenBtns";
import Toast from "react-native-toast-message";

const Guide = () => {
  const [found, setFound] = useState(false);
  const [show, setShow] = useState(true);
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
  const navigation = useNavigation();
  const backgroundImage = require("../src/images/guide.jpg");
  const showToast = (message, typeOfMsg, text2) => {
    Toast.show({
      type: typeOfMsg,
      text1: message,
      text2: text2,
    });
  };
  const scene = {
    get: {
      width: 54,
      height: 30,
      top: 290,
      left: 30,
    },
  };
  const onFind = () => {
    setFound(true);
    showToast(plot.guide.found, "success");
  };

  const onPassageClick = () => {
    found ? navigation.navigate("Intro") : alert(plot.guide.denied);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        className="flex-1 cover"
        source={backgroundImage}
        // style={{ transform: [{ scale: zoom }] }}
      >
        {!found && (
          <FindTheThing
            foundThing={onFind}
            image={require("../src/images/fl.png")}
            scene={scene}
            rotationDegrees={26}
          />
        )}
        <TouchableOpacity
          onPress={onPassageClick}
          className="absolute  w-32 h-72 left-48 top-16"
        ></TouchableOpacity>
        <MenuButton text={plot.buttons.menu} />
        <TouchableOpacity
          className="bg-[#2d2d2d80] p-1 my-1 rounded items-center justify-center absolute top-2 right-4"
          onPress={() => navigation.navigate("Intro")}
        >
          <Text className="text-[#fcf6bd] text-base font-bold">
            {plot.guide.skip}
          </Text>
        </TouchableOpacity>
        {show && (
          <View className="absolute bottom-0 w-full p-2 py-1 bg-[#333333a3] rounded-t-2xl z-10">
            <ScnDescription text={plot.guide.text} />
            <View className="flex flex-row justify-around flex-wrap">
              <TouchableOpacity
                //   key={buttonIndex}
                onPress={() => {
                  console.log("object");
                  setShow(false);
                }}
                className="bg-[#2f2f2f80] p-1 my-1 rounded items-center justify-center"
              >
                <Text className="text-[#fcf6bd] text-base font-bold">
                  {plot.guide.button}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Guide;

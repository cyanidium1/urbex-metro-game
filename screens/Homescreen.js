import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ploten from "../src/plot/plot.json";
import plotru from "../src/plot/plotru.json";

// import plotua from "../src/plot/plotua.json";
// import plotde from "../src/plot/plotde.json";
// import plotfr from "../src/plot/plotfr.json";
// import plotes from "../src/plot/plotes.json";

function Homescreen() {
  const history = useSelector((state) => state.game.history);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.game.lang);
  // lang settings
  let plot;
  switch (lang) {
    case "ru":
      plot = plotru;
      break;
    // case "es":
    //   plot = plotes;
    //   break;
    // case "de":
    //   plot = plotde;
    //   break;
    // case "fr":
    //   plot = plotfr;
    //   break;
    // case "ua":
    //   plot = plotua;
    //   break;
    default:
      plot = ploten;
      break;
  }
  const { play, about, settings, items } = plot.buttons;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        className="bg-cover h-full w-full"
        source={require("../src/images/main-1.jpg")}
      >
        <View className="flex items-center mt-8">
          <TouchableOpacity
            className="bg-[#21252980] p-2 my-1 rounded items-center w-48"
            onPress={() => {
              history.length > 1
                ? navigation.navigate("Game")
                : navigation.navigate("Intro");
            }}
          >
            <Text className="text-[#fcf6bd] text-xl font-bold">{play}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#21252980] p-2 my-1 rounded items-center w-48"
            onPress={() => {
              navigation.navigate("About");
            }}
          >
            <Text className="text-[#fcf6bd] text-xl font-bold">{about}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#21252980] p-2 my-1 rounded items-center w-48"
            onPress={() => navigation.navigate("Settings")}
          >
            <Text className="text-[#fcf6bd] text-xl font-bold">{settings}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#21252980] p-2 my-1 rounded items-center w-48"
            onPress={() =>
              navigation.navigate("Finish", {
                finished: false,
                message: "kek",
              })
            }
          >
            <Text className="text-[#fcf6bd] text-xl font-bold">{items}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Homescreen;

import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";

function Homescreen() {
  const history = useSelector((state) => state.game.history);
  const navigation = useNavigation();
  // lang settings
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
  const { play, about, settings, items } = plot.buttons;

  // audio
  const [audio, setAudio] = useState(new Audio.Sound()); // Initialize the audio sound object

  const playIntroSound = async () => {
    try {
      // await audio.loadAsync(require("../src/sound/main.mp3")); // Load the sound file
      await audio.playAsync(); // Play the audio
    } catch (error) {
      console.error("Error playing sound: ", error);
    }
  };

  const stopIntroSound = async () => {
    try {
      await audio.stopAsync(); // Stop the audio
    } catch (error) {
      console.error("Error stopping sound: ", error);
    }
  };

  useEffect(() => {
    playIntroSound(); // Play the intro sound when the component mounts

    return () => {
      stopIntroSound(); // Stop the sound when the component unmounts
    };
  }, []);
  //

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        className="bg-cover h-full w-full"
        source={require("../src/videos/main-1.gif")}
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

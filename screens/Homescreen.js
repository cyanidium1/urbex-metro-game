import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import playMusicAsync from "../src/assets/soundPlayer";
import { setAds } from "../redux/gameSlice";

function Homescreen() {
  // audios
  useEffect(() => {
    playMusicAsync("main");
  }, []);
  //

  const history = useSelector((state) => state.game.history);
  const ads = useSelector((state) => state.game.ads);
  const dispatch = useDispatch();
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
  const [clicks, setClicks] = useState(0);
  const handleClick = () => {
    setClicks(clicks + 1);
    if (clicks > 8) {
      alert("Ads disabled");
      dispatch(setAds(false));
    }
  };
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
                : navigation.navigate("Guide");
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
          {ads && (
            <TouchableOpacity
              className="p-2 my-1 rounded items-center w-16 h-28"
              onPress={handleClick}
            ></TouchableOpacity>
          )}
          {!ads && (
            <TouchableOpacity
              className="bg-[#21252980] p-1 mt-28 rounded items-center w-36"
              onPress={() => {
                alert("Thanks for your support !");
                dispatch(setAds(true));
                setClicks(0);
              }}
            >
              <Text className="text-[#ffffff] font-bold">Show ads</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Homescreen;

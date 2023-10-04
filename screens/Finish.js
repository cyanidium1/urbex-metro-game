import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MenuButton from "./Components/MenuButton";
import { useDispatch, useSelector } from "react-redux";
import images from "../src/images";
import {
  setFinish,
  setFrame,
  setLife,
  updateHistory,
} from "../redux/gameSlice";
import { useNavigation } from "@react-navigation/native";

const Finish = ({ route }) => {
  const navigation = useNavigation();
  const { finished, message } = route.params;
  const inv = useSelector((state) => state.game.inv);
  const lang = useSelector((state) => state.game.lang);
  const progress = useSelector((state) => state.game.progress);
  const numberOfPockemons = inv.filter((str) => str.length < 3).length;
  const numberOfAchs = inv.filter((str) => str.includes("ee")).length;
  const dispatch = useDispatch();
  // bad stat ["p0", "p2", "p21", "p215", "p211", "p1211", "p12112", "p121123", "p1211231", "p1211231112", "p12112311121"]
  // good stat ["p0", "p1", "p11", "p111", "p1112", "p1113", "p11131", "p11132", "p111321", "p1113213", "p11132133", "p111321331", "pb1", "pb11", "pb114", "pb1143", "pb1131", "pb11311", "pb113111", "pb1131113", "pb11311131", "pb113111", "pb1131111", "pb11311111", "pb113111111", "pb11311111",
  // "pb113111112", "pb1131111121", "pb11311111211", "pb113111", "pb1131112", "pb11311121", "pb113111212", "pb113111211", "pb1131112111", "pb113111211", "pb1131112112", "pb11311121", "p121111", "p1211111", "p1211231", "p12112311", "p121123111", "p1211231112", "p12112311121"]
  let plot;
  useEffect(() => {
    if (finished) {
      dispatch(setFinish(true));
      dispatch(setLife(2));
    }
  }, []);

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
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        className="flex-1"
        source={require("../src/images/777.jpg")}
      >
        <MenuButton text={plot.buttons.menu} />
        {finished && (
          <View className="flex items-center">
            <Text className="text-[#ffffff] text-2xl font-bold bg-[#2a2a2a80] p-1 mt-2 rounded">
              {plot.other.completed}
            </Text>
          </View>
        )}
        <View className="flex flex-row mt-8">
          <View className="w-1/2 flex items-center align-middle content-center">
            <Text className="text-[#ffffff] text-base font-bold bg-[#2a2a2a80] p-1 mb-2">
              {`${plot.other.found} ${numberOfPockemons} ${plot.other.of} 15:`}
            </Text>
            <View className="flex-row flex-wrap bg-[#2a2a2a80] w-5/6 p-2">
              {inv.map((el) => {
                if (el.length < 3) {
                  return (
                    <Image
                      key={el}
                      source={images[el]}
                      className="max-w-[50px] max-h-[50px] object-contain m-3 ml-0"
                    />
                  );
                }
                return null;
              })}
            </View>
          </View>

          <View className="w-1/2 flex items-center align-middle content-center">
            <Text className="text-[#ffffff] text-base font-bold bg-[#2a2a2a80] p-1 mb-2">
              {`${plot.other.found} ${numberOfAchs} ${plot.other.items} 3:`}
            </Text>
            <View className="flex-row flex-wrap bg-[#2a2a2a80] w-5/6 p-2">
              {inv.map((el) => {
                if (el.includes("ee")) {
                  return (
                    <Image
                      key={el}
                      source={images[el]}
                      className="max-w-[100px] max-h-[65px] object-contain m-1 ml-0"
                    />
                  );
                }
                return null;
              })}
            </View>
            {finished && (
              <Text className="text-[#ffffff] text-base font-bold bg-[#2a2a2a80] p-1 mt-2">
                {`${plot.other.visited} ${progress} ${plot.other.visited2}`}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          className="bg-[#21252980] p-2 my-1 rounded items-center absolute bottom-2 right-2"
          onPress={() => {
            navigation.navigate("Intro");
            dispatch(setFrame("p0"));
            dispatch(updateHistory(["p0"]));
          }}
        >
          {finished && (
            <Text className="text-[#fcf6bd] text-base font-bold">
              {plot.buttons.newGame}
            </Text>
          )}
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Finish;

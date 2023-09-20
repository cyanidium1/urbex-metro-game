import React from "react";
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
import { setFrame, updateHistory } from "../redux/gameSlice";
import { useNavigation } from "@react-navigation/native";

const Finish = () => {
  const navigation = useNavigation();
  const inv = useSelector((state) => state.game.inv);
  const lang = useSelector((state) => state.game.lang);
  const numberOfPockemons = inv.filter((str) => str.length < 3).length;
  const numberOfAchs = inv.filter((str) => str.includes("ee")).length;
  const dispatch = useDispatch();

  dispatch(updateHistory(["p0"]));
  dispatch(setFrame("p0"));
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        className="flex-1"
        source={require("../src/images/777.jpg")}
      >
        <MenuButton />
        <View className="flex items-center">
          <Text className="text-[#ffffff] text-2xl font-bold bg-[#2a2a2a80] p-1 mt-2 rounded">
            {lang === "en" ? "You complited the game 🎉" : "Вы прошли игру 🎉"}
          </Text>
        </View>
        <View className="flex flex-row mt-8">
          <View className="w-1/2 flex items-center align-middle content-center">
            <Text className="text-[#ffffff] text-base font-bold bg-[#2a2a2a80] p-1 mb-2">
              {lang === "en"
                ? `You found ${numberOfPockemons} pockemons of 15:`
                : `Вы нашли ${numberOfPockemons} из 15 покемонов:`}
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
              {lang === "en"
                ? `You found ${numberOfAchs} of 3 secret items:`
                : `Вы нашли ${numberOfAchs} из 3 секретных предметов:`}
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
          <Text className="text-[#fcf6bd] text-base font-bold">
            {lang === "en" ? "New game" : "Новая игра"}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Finish;

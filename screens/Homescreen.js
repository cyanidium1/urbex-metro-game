import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  chLang,
  setFrame,
  toggleShowMap,
  updateHistory,
} from "../redux/gameSlice";

function Homescreen() {
  const lang = useSelector((state) => state.game.lang);
  const history = useSelector((state) => state.game.history);
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
            <Text className="text-[#fcf6bd] text-xl font-bold">
              {lang === "en" ? "Continue" : "Продолжить"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#21252980] p-2 my-1 rounded items-center w-48"
            onPress={() => {
              navigation.navigate("Intro");
              dispatch(setFrame("p0"));
              dispatch(updateHistory(["p0"]));
            }}
          >
            <Text className="text-[#fcf6bd] text-xl font-bold">
              {lang === "en" ? "New game" : "Новая игра"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#21252980] p-2 my-1 rounded items-center w-48"
            onPress={() => navigation.navigate("Settings")}
          >
            <Text className="text-[#fcf6bd] text-xl font-bold">
              {lang === "en" ? "Settings" : "Настройки"}
            </Text>
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
            <Text className="text-[#fcf6bd] text-xl font-bold">
              {lang === "en" ? "Items" : "Предметы"}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Homescreen;

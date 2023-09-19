import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { chLang, toggleShowMap } from "../redux/gameSlice";

function Homescreen() {
  const dispatch = useDispatch();
  // const [lang, chLang] = useState("en");
  const lang = useSelector((state) => state.game.lang);
  const history = useSelector((state) => state.game.history);

  // const [plotBtn, togglePlotBtn] = useState(false);
  const showMap = useSelector((state) => state.game.showMap);

  const navigation = useNavigation();
  const main = require("../src/images/main-1.jpg");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground className="bg-cover h-full w-full" source={main}>
        <TouchableOpacity
          className="bg-[#21252980] p-2 my-1 rounded items-center justify-center absolute top-6 left-6"
          onPress={() => {
            lang === "en" ? dispatch(chLang("ru")) : dispatch(chLang("en"));
          }}
        >
          <Text className="text-[#fcf6bd] text-xl font-bold">
            {lang === "en" ? "language: en" : "язык: рус"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#21252980] p-2 my-1 rounded items-center justify-center absolute top-20 left-6"
          onPress={() => {
            dispatch(toggleShowMap(!showMap));
          }}
        >
          <Text className="text-[#fcf6bd] text-xl font-bold">
            {showMap
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
            onPress={() => {
              history.length > 1
                ? navigation.navigate("Game")
                : navigation.navigate("Intro");
            }}
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

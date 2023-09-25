import React, { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MenuButton from "./Components/MenuButton";
import { useDispatch, useSelector } from "react-redux";
import {
  chLang,
  setFrame,
  toggleShowMap,
  updateHistory,
  updateInv,
} from "../redux/gameSlice";
import Toast from "react-native-toast-message";

import ploten from "../src/plot/plot.json";
import plotru from "../src/plot/plotru.json";
// import plotua from "../src/plot/plotua.json";
// import plotde from "../src/plot/plotde.json";
// import plotfr from "../src/plot/plotfr.json";
// import plotes from "../src/plot/plotes.json";

const Settings = () => {
  const [modal, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const showMap = useSelector((state) => state.game.showMap);
  const lang = useSelector((state) => state.game.lang);

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

  const showToast = () => {
    Toast.show({
      type: "error",
      text1: lang === "en" ? "Progress deleted" : "Прогресс обнулен",
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        className="flex-1 flex-col justify-center"
        source={require("../src/images/settings.jpg")}
      >
        <MenuButton />

        <TouchableOpacity
          className="bg-[#21252980] p-2 my-1 rounded items-center justify-center"
          onPress={() => {
            setModalVisible(!modal);
          }}
        >
          <Text className="text-[#fcf6bd] text-xl font-bold">
            {lang === "en" ? "Game language: English" : "Язык игры: русский"}
          </Text>
        </TouchableOpacity>

        <View
          className=""
          style={modal ? { display: "block" } : { display: "none" }}
        >
          <View className="bg-[#21252980] p-2 my-1 rounded items-center justify-center">
            <Text className="text-[#ff6a49] text-xl font-bold">
              Other languages will be added soon...
            </Text>
          </View>
          <View className="flex flex-row space-x-2 justify-center items-center">
            <TouchableOpacity
              className="bg-[#21252980] p-2 my-1 rounded items-center justify-center"
              onPress={() => {
                dispatch(chLang("ru"));
                setModalVisible(false);
              }}
            >
              <Text className="text-[#fcf6bd] text-xl font-bold">Русский</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#21252980] p-2 my-1 rounded items-center justify-center"
              onPress={() => {
                dispatch(chLang("en"));
                setModalVisible(false);
              }}
            >
              <Text className="text-[#fcf6bd] text-xl font-bold">English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#21252980] p-2 my-1 rounded items-center justify-center"
              onPress={() => {
                // dispatch(chLang("ua"));
                setModalVisible(false);
              }}
            >
              <Text className="text-[#747474] text-xl font-bold">
                Українська
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#21252980] p-2 my-1 rounded items-center justify-center"
              onPress={() => {
                // dispatch(chLang("es"));
                setModalVisible(false);
              }}
            >
              <Text className="text-[#747474] text-xl font-bold">Español</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#21252980] p-2 my-1 rounded items-center justify-center"
              onPress={() => {
                // dispatch(chLang("de"));
                setModalVisible(false);
              }}
            >
              <Text className="text-[#747474] text-xl font-bold">Deutsch</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#21252980] p-2 my-1 rounded items-center justify-center"
              onPress={() => {
                // dispatch(chLang("fr"));
                setModalVisible(false);
              }}
            >
              <Text className="text-[#747474] text-xl font-bold">Français</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className="bg-[#21252980] p-2 my-1 rounded items-center justify-center"
          onPress={() => {
            dispatch(toggleShowMap(!showMap));
          }}
        >
          <Text className="text-[#fcf6bd] text-xl font-bold">
            {showMap
              ? lang === "en"
                ? "Plot map:  shown"
                : "Карта сюжета: показана"
              : lang === "en"
              ? "Plot map:  hidden"
              : "Карта сюжета: спрятана"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#21252980] p-2 my-1 rounded items-center justify-center"
          onPress={() => {
            dispatch(updateInv([]));
            dispatch(updateHistory(["p0"]));
            dispatch(setFrame("p0"));
            showToast();
          }}
        >
          <Text className="text-[#fcf6bd] text-xl font-bold">
            {lang === "en"
              ? "Reset game progress (including found things)"
              : "Сбросить прогресс игры (включая предметы)"}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Settings;

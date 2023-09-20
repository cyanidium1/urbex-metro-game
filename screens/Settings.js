import React from "react";
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

const Settings = () => {
  const dispatch = useDispatch();
  const showMap = useSelector((state) => state.game.showMap);
  const lang = useSelector((state) => state.game.lang);

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
            lang === "en" ? dispatch(chLang("ru")) : dispatch(chLang("en"));
          }}
        >
          <Text className="text-[#fcf6bd] text-xl font-bold">
            {lang === "en" ? "Game language: English" : "Язык игры: русский"}
          </Text>
        </TouchableOpacity>
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

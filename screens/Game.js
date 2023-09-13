import React, { useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import ploten from "../src/plot/plot.json";
import plotru from "../src/plot/plotru.json";
import { useNavigation, useRoute } from "@react-navigation/native";
import images from "../src/images";

const Game = () => {
  const {
    params: { lang },
  } = useRoute();
  let plot;
  switch (lang) {
    case "ru":
      plot = plotru;
      break;

    default:
      plot = ploten;
      break;
  }

  const navigation = useNavigation();

  const [frame, changeFrame] = useState("p0");
  const [history, updHistory] = useState(["p0"]);

  const scene = plot[frame];

  function onButtonClick(click) {
    if (click === "ptryAgain") {
      changeFrame("p0");
      updHistory(["p0"]);
      return;
    }

    changeFrame(click);
    updHistory([...history, click]);
  }

  function ctrlZ() {
    if (history.length > 1) {
      changeFrame(history[history.length - 2]);
      updHistory(history.slice(0, -1));
      return;
    }
    alert("wanna return up to your birthday?");
  }

  return (
    // <ImageBackground
    //   source={require(`../src/images/${scene.bg}.jpg`)}
    //   style={styles.backgroundImage}
    // >
    <ImageBackground source={images[frame]} className="cover flex-1">
      {/* DEVELOPER INFO */}
      {/* <Text className="text-2xl text-white bg-black">
        FR: {frame + ""} BG: {scene.bg}
      </Text> */}

      <View className="flex-1">
        <View className="absolute top-8 left-2">
          <TouchableOpacity
            className="bg-[#2f2f2f80] p-1 my-1 rounded items-center justify-center"
            onPress={() => navigation.navigate("Home")}
          >
            <Text className="text-[#fcf6bd] text-base font-bold">
              {lang === "en" ? "Menu" : "Меню"}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="absolute top-8 right-2">
          <TouchableOpacity
            onPress={ctrlZ}
            className="bg-[#2e2e2e80] p-1 my-1 rounded items-center justify-center"
          >
            <Text className="text-[#fcf6bd] text-base font-bold">
              {lang === "en" ? "Undo" : "Шаг назад"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* hidden btns positioned absolutely */}
        {[1, 2, 3, 4, 5].map((buttonIndex) => {
          const hb = scene[`hb${buttonIndex}`];
          if (hb) {
            return (
              <TouchableOpacity
                key={buttonIndex}
                style={{
                  position: "absolute",

                  // for dev
                  // backgroundColor: "red",

                  // patch to use same plot in web and mobile versions

                  width: parseInt(hb[`width`].slice(0, -2)),
                  height: parseInt(hb[`height`].slice(0, -2)),
                  top: parseInt(hb[`top`].slice(0, -2)) - 145,
                  left: parseInt(hb[`left`].slice(0, -2)),
                }}
                onPress={() => onButtonClick(hb[`hf${buttonIndex}`])}
              />
            );
          }
          return null;
        })}

        <View className="absolute bottom-0 w-full p-2 py-1 bg-[#333333a3] rounded-t-2xl">
          <Text className="text-base text-white font-bold">{scene.p}</Text>
          <View className="flex flex-row justify-around flex-wrap">
            {[1, 2, 3, 4, 5].map((buttonIndex) => {
              const buttonText = scene[`b${buttonIndex}`];
              if (buttonText) {
                return (
                  <TouchableOpacity
                    key={buttonIndex}
                    onPress={() => onButtonClick(scene[`f${buttonIndex}`])}
                    className="bg-[#2f2f2f80] p-1 my-1 rounded items-center justify-center"
                  >
                    <Text className="text-[#fcf6bd] text-base font-bold">
                      {buttonText}
                    </Text>
                  </TouchableOpacity>
                );
              }
              return null;
            })}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Game;

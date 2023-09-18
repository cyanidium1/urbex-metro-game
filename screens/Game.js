import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import ploten from "../src/plot/plot.json";
import plotru from "../src/plot/plotru.json";
import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute } from "@react-navigation/native";
import images from "../src/images";

const Game = () => {
  const navigation = useNavigation();

  const [inv, updInv] = useState([""]);
  const [showMap, toggleShowMap] = useState(false);
  const [frame, changeFrame] = useState("p0"); // p0
  const [history, updHistory] = useState(["p0"]);
  const [imageVisible, setImageVisible] = useState(true);
  // animation
  useEffect(() => {
    setImageVisible(false);
    setTimeout(() => {
      setImageVisible(true);
    }, 500);
  }, [frame]);
  // lang settings
  const {
    params: { lang, plotBtn },
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
  // story telling
  const scene = plot[frame];
  // controls
  function onButtonClick(click, buttonIndex) {
    const thing = scene[`b${buttonIndex}if`];
    if (thing) {
      if (!inv.includes(thing)) {
        alert(scene[`b${buttonIndex}error`]);
        return;
      }
    }
    if (click.includes("add")) {
      if (!inv.includes(click)) {
        updInv([...inv, click]);
        alert(click);
        return;
      }
      return;
    }
    if (click === "p777") {
      alert("you finished!");
    }
    if (click === "ptryAgain") {
      changeFrame("p0");
      updHistory(["p0"]);
      return;
    }

    changeFrame(click);
    updHistory([...history, click]);
  }
  // undo btn
  function ctrlZ() {
    if (history.length > 1) {
      changeFrame(history[history.length - 2]);
      updHistory(history.slice(0, -1));
      return;
    }
    // alert("wanna return up to your birthday?");
  }
  // find thing
  function foundThing() {
    if (inv.includes(scene.get.bg)) {
      return;
    }
    updInv([...inv, scene.get.bg]);
    alert(
      lang === "en"
        ? `You found a ${scene.get.name}`
        : `Вы нашли ${scene.get.name}`
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={images[frame]} className="cover flex-1">
        {/* find the thing */}
        {scene.get && !inv.includes(scene.get.bg) && (
          <TouchableOpacity
            onPress={() => foundThing()}
            className="z-10 absolute flex flex-col"
            style={{
              width: scene.get.width,
              height: scene.get.height,
              top: scene.get.top,
              left: scene.get.left,
            }}
          >
            <Image
              className="w-full h-full object-contain"
              source={images[scene.get.bg]}
            />
          </TouchableOpacity>
        )}
        {imageVisible && (
          <Animatable.View
            className="flex-1 "
            animation="fadeIn"
            // delay={500}
            duration={1500}
          >
            {/*show frame for debug */}
            <Text className="absolute text-2xl text-white bg-black">
              FR: {frame + " "}
            </Text>

            {showMap && (
              <TouchableOpacity
                onPress={() => toggleShowMap(false)}
                className="z-10 absolute flex flex-col justify-center items-center w-full h-full"
              >
                <Animatable.View
                  className="w-full h-full"
                  animation="zoomIn"
                  duration={1500}
                >
                  <Image
                    className="w-full h-full object-contain"
                    source={lang === "en" ? images.mapen : images.mapru}
                  />
                </Animatable.View>
              </TouchableOpacity>
            )}
            <View className="flex-1">
              {/* top buttons */}
              <View className="absolute top-2 left-2">
                <TouchableOpacity
                  className="bg-[#2f2f2f80] p-1 my-1 rounded items-center justify-center"
                  onPress={() => navigation.navigate("Home")}
                >
                  <Text className="text-[#fcf6bd] text-base font-bold">
                    {lang === "en" ? "Menu" : "Меню"}
                  </Text>
                </TouchableOpacity>
                {plotBtn && (
                  <TouchableOpacity
                    className="bg-[#2f2f2f80] p-1 my-1 rounded items-center justify-center"
                    onPress={() => toggleShowMap(!showMap)}
                  >
                    <Text className="text-[#fcf6bd] text-base font-bold">
                      {lang === "en" ? "Map" : "Карта"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View className="absolute top-2 right-2">
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
                <Text className="text-base text-white font-bold text-center">
                  {scene.p}
                </Text>
                <View className="flex flex-row justify-around flex-wrap">
                  {[1, 2, 3, 4, 5].map((buttonIndex) => {
                    const buttonText = scene[`b${buttonIndex}`];
                    if (buttonText) {
                      return (
                        <TouchableOpacity
                          key={buttonIndex}
                          onPress={() =>
                            onButtonClick(scene[`f${buttonIndex}`], buttonIndex)
                          }
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
          </Animatable.View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Game;

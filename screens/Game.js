import React, { useState, useEffect } from "react";
import { View, ImageBackground, SafeAreaView, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { useSelector, useDispatch } from "react-redux";
import {
  updateInv,
  setFrame,
  updateHistory,
  setProg,
} from "../redux/gameSlice";
import images from "../src/images";
import MenuButton from "./Components/MenuButton";
import HiddenBtns from "./Components/HiddenBtns";
import VariantBtns from "./Components/VariantBtns";
import ScnDescription from "./Components/ScnDescription";
import UndoBtn from "./Components/UndoBtn";
import CheatMap from "./Components/CheatMap";
import CheatBtn from "./Components/CheatBtn";
import FindTheThing from "./Components/FindTheThing";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import playMusicAsync from "../src/assets/soundPlayer";
import playSfxAsync from "../src/assets/soundEffect";
import functional from "../src/plot/functional.json";

// for ads
// import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

// const adUnitId = "ca-app-pub-7466278964548443~1477731689";

const Game = () => {
  // state
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.game.lang);
  const inv = useSelector((state) => state.game.inv);
  const showMap = useSelector((state) => state.game.showMap);
  const frame = useSelector((state) => state.game.frame);
  const history = useSelector((state) => state.game.history);
  // local state
  const [cheats, showCheats] = useState(false);
  // notifs
  const showToast = (message, typeOfMsg, text2) => {
    Toast.show({
      type: typeOfMsg,
      text1: message,
      text2: text2,
    });
  };
  // soundtrack
  useEffect(() => {
    if (frame.includes("p111321331") || frame.includes("pb1")) {
      playMusicAsync("bunker");
    } else {
      if (frame.includes("p1211")) {
        //   playMusicAsync("silence");
        // } else
        playMusicAsync("metro");
      }
    }
  }, []);

  // animation
  const [imageVisible, setImageVisible] = useState(false);
  useEffect(() => {
    setImageVisible(false);
    setTimeout(() => {
      setImageVisible(true);
    }, 500);
  }, [frame]);
  // nav
  const navigation = useNavigation();
  // lang settings
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
  // story telling
  const scene = plot[frame];
  // controls
  function onButtonClick(click, buttonIndex) {
    // soundtrack
    // console.log("inv:", inv);
    console.log("click:", click);
    if (click === "p111321331") {
      playMusicAsync("bunker");
    }
    if (click === "p1211") {
      playMusicAsync("metro");
    }
    if (click === "p121111" || click === "p1211") {
      playMusicAsync("silence");
    }
    if (functional[click]) {
      playSfxAsync(functional[click]);
      // console.log(functional[]);
    }

    const thing = scene[`b${buttonIndex}if`];
    if (thing) {
      if (!inv.includes(thing)) {
        msg = scene[`b${buttonIndex}error`];
        alert(msg);
        return;
      }
    }
    if (click.includes("add")) {
      if (!inv.includes(click)) {
        dispatch(updateInv([...inv, click]));
        const msg = plot.other.message;
        showToast(msg, "success");
        return;
      }
      return;
    }
    if (click === "p777") {
      const percentage = (history.length / 45) * 100;
      const prog = percentage > 100 ? "100%" : Math.floor(percentage) + "%";
      dispatch(setProg(prog));
      navigation.navigate("Finish", {
        finished: true,
        message: "kek",
      });
      dispatch(updateHistory(["p0"]));
      dispatch(setFrame("p0"));
      return;
    }
    if (click === "ptryAgain") {
      dispatch(setFrame("p0"));
      dispatch(updateHistory(["p0"]));
      return;
    }

    dispatch(setFrame(click));
    dispatch(updateHistory([...history, click]));
  }
  // undo btn
  function ctrlZ() {
    if (history.length > 1) {
      const newFrame = history[history.length - 2];
      const newHistory = history.slice(0, -1);

      dispatch(setFrame(newFrame));
      dispatch(updateHistory(newHistory));

      return;
    }
  }
  // find thing
  function foundThing() {
    if (inv.includes(scene.get.bg)) {
      return;
    }
    dispatch(updateInv([...inv, scene.get.bg]));
    if (scene.get.altText) {
      showToast(scene.get.altText, "success", scene.get.name);
      return;
    }
    const msg = `${plot.other.youFound}${scene.get.name}`;
    showToast(msg, "success");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={images[frame]} className="cover flex-1">
        {/* find the thing */}
        {scene.get && !inv.includes(scene.get.bg) && (
          <FindTheThing
            foundThing={foundThing}
            image={images[scene.get.bg]}
            scene={scene}
          />
        )}
        {imageVisible && (
          <Animatable.View
            className="flex-1 "
            animation="fadeIn"
            duration={1500}
          >
            {/*show frame for debug */}
            <Text className="absolute text-2xl text-white bg-black">
              FR: {frame + " "}
            </Text>
            {/* cheat map */}
            <CheatMap cheats={cheats} images={images} showCheats={showCheats} />
            <View className="flex-1">
              {/* top buttons */}
              <MenuButton text={plot.buttons.menu} />
              {showMap && (
                <CheatBtn
                  cheats={cheats}
                  text={plot.buttons.map}
                  showCheats={showCheats}
                />
              )}
              <UndoBtn ctrlZ={ctrlZ} text={plot.buttons.undo} />
              <HiddenBtns scene={scene} onButtonClick={onButtonClick} />
              {/* bottom text and btns */}
              <View className="absolute bottom-0 w-full p-2 py-1 bg-[#333333a3] rounded-t-2xl">
                <ScnDescription text={scene.p} />
                <VariantBtns scene={scene} onButtonClick={onButtonClick} />
              </View>
            </View>
          </Animatable.View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Game;

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
import { useSelector, useDispatch } from "react-redux";
import { updateInv, setFrame, updateHistory } from "../redux/gameSlice";
import images from "../src/images";
import MenuButton from "./Components/MenuButton";
import HiddenBtns from "./Components/HiddenBtns";
import VariantBtns from "./Components/VariantBtns";
import ScnDescription from "./Components/ScnDescription";
import UndoBtn from "./Components/UndoBtn";
import CheatMap from "./Components/CheatMap";
import CheatBtn from "./Components/CheatBtn";
import FindTheThing from "./Components/FindTheThing";

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

  // animation
  const [imageVisible, setImageVisible] = useState(false);
  useEffect(() => {
    setImageVisible(false);
    setTimeout(() => {
      setImageVisible(true);
    }, 500);
  }, [frame]);

  // lang settings
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
    console.log("inv:", inv);
    console.log("click:", click);
    console.log("buttonIndex:", buttonIndex);
    const thing = scene[`b${buttonIndex}if`];
    if (thing) {
      if (!inv.includes(thing)) {
        alert(scene[`b${buttonIndex}error`]);
        return;
      }
    }
    if (click.includes("add")) {
      if (!inv.includes(click)) {
        dispatch(updateInv([...inv, click]));
        alert(click);
        return;
      }
      return;
    }
    if (click === "p777") {
      alert("you finished!");
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
              <MenuButton />
              {showMap && <CheatBtn cheats={cheats} showCheats={showCheats} />}
              <UndoBtn ctrlZ={ctrlZ} />
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

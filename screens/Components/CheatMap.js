import React from "react";
import { Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";

const CheatMap = ({ cheats, images, showCheats }) => {
  const lang = useSelector((state) => state.game.lang);
  return (
    cheats && (
      <TouchableOpacity
        onPress={() => showCheats(false)}
        className="z-20 absolute flex flex-col justify-center items-center w-full h-full"
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
    )
  );
};

export default CheatMap;

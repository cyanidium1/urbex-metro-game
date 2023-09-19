import React from "react";
import { Image, TouchableOpacity } from "react-native";

const FindTheThing = ({ foundThing, image, scene }) => {
  return (
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
      <Image className="w-full h-full object-contain" source={image} />
    </TouchableOpacity>
  );
};

export default FindTheThing;

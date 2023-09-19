import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const CheatBtn = ({ cheats, showCheats }) => {
  const lang = useSelector((state) => state.game.lang);

  return (
    <TouchableOpacity
      className="bg-[#2f2f2f80] p-1 my-1 rounded w-fit absolute top-12 left-2"
      onPress={() => showCheats(!cheats)}
    >
      <Text className="text-[#fcf6bd] text-base font-bold">
        {lang === "en" ? "Map" : "Карта"}
      </Text>
    </TouchableOpacity>
  );
};

export default CheatBtn;

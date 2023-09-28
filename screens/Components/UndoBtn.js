import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const UndoBtn = ({ ctrlZ, text }) => {
  const lang = useSelector((state) => state.game.lang);
  return (
    <View className="absolute top-2 right-2">
      <TouchableOpacity
        onPress={ctrlZ}
        className="bg-[#2e2e2e80] p-1 my-1 rounded items-center justify-center"
      >
        <Text className="text-[#fcf6bd] text-base font-bold">{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UndoBtn;

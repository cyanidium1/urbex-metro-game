import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import playMusicAsync from "../../src/assets/soundPlayer";

const MenuButton = ({ text = "menu" }) => {
  const navigation = useNavigation();
  return (
    <View className="absolute top-2 left-2">
      <TouchableOpacity
        className="bg-[#2a2a2a80] p-1 my-1 rounded items-center justify-center"
        onPress={() => {
          navigation.navigate("Home");
          playMusicAsync("menu");
        }}
      >
        <Text className="text-[#fcf6bd] text-base font-bold">{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuButton;

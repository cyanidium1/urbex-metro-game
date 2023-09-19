import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const MenuButton = () => {
  const lang = useSelector((state) => state.game.lang);
  const navigation = useNavigation();

  return (
    <View className="absolute top-2 left-2">
      <TouchableOpacity
        className="bg-[#2a2a2a80] p-1 my-1 rounded items-center justify-center"
        onPress={() => navigation.navigate("Home")}
      >
        <Text className="text-[#fcf6bd] text-base font-bold">
          {lang === "en" ? "Menu" : "Меню"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuButton;
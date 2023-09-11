import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import Menu from "./Menu";

const Homescreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="h-16 bg-blue-500 flex-row justify-between items-center">
        <Text className="text-white text-lg font-bold ml-4">My App</Text>
      </View>
      <Menu />
      <View className="flex-1 bg-white p-4">
        <Text>Welcome to the Home Screen!</Text>
      </View>
    </SafeAreaView>
  );
};

export default Homescreen;

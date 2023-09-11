// components/Menu.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Menu = () => {
  return (
    <View className="bg-gray-100 p-4">
      <TouchableOpacity className="p-2 border-b border-gray-300">
        <Text className="text-gray-700">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-2 border-b border-gray-300">
        <Text className="text-gray-700">About</Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-2 border-b border-gray-300">
        <Text className="text-gray-700">Services</Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-2 border-b border-gray-300">
        <Text className="text-gray-700">Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;

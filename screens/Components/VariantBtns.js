import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const VariantBtns = ({ scene, onButtonClick }) => {
  return (
    <View className="flex flex-row justify-around flex-wrap">
      {[1, 2, 3, 4, 5].map((buttonIndex) => {
        const buttonText = scene[`b${buttonIndex}`];
        if (buttonText) {
          return (
            <TouchableOpacity
              key={buttonIndex}
              onPress={() => {
                onButtonClick(scene[`f${buttonIndex}`], buttonIndex);
              }}
              className="bg-[#2f2f2f80] p-1 my-1 rounded items-center justify-center"
            >
              <Text className="text-[#fcf6bd] text-base font-bold">
                {buttonText}
              </Text>
            </TouchableOpacity>
          );
        }
        return null;
      })}
    </View>
  );
};

export default VariantBtns;

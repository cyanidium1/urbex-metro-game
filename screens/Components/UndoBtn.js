import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setLife } from "../../redux/gameSlice";

const UndoBtn = ({ ctrlZ, text }) => {
  const dispatch = useDispatch();
  const life = useSelector((state) => state.game.life);
  const back = () => {
    if (life > 0) {
      dispatch(setLife(life - 1));
      return ctrlZ();
    }
    alert("No!");
  };
  return (
    <View className="absolute top-2 right-2">
      <TouchableOpacity
        onPress={() => back()}
        className="bg-[#2e2e2e80] p-1 my-1 rounded items-center justify-center"
      >
        <Text className="text-[#fcf6bd] text-base font-bold">
          {text}({life})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UndoBtn;

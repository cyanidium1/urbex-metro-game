import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setLife } from "../../redux/gameSlice";
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";
import { Alert } from "react-native";

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : "ca-app-pub-7466278964548443/7070689315";

const UndoBtn = ({ ctrlZ, text }) => {
  const dispatch = useDispatch();
  const life = useSelector((state) => state.game.life);
  const back = () => {
    if (life > 0) {
      dispatch(setLife(life - 1));
      return ctrlZ();
    }
    Alert.alert(
      "",
      "No more lives left!",
      [
        {
          text: "Close",
          onPress: () => {
            // Handle "OK" action
          },
        },
        // {
        //   text: "Watch Ad to Get 2 More Lives",
        //   onPress: () => {
        //     console.log("watchig");
        //     // Handle "Watch Ad" action
        //     // You can add your ad logic here
        //     // setAdAlertVisible(false); // Close the alert after watching the ad
        //   },
        // },
      ],
      { cancelable: false }
    );
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

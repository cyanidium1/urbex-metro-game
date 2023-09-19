import React from "react";
import { TouchableOpacity } from "react-native";

const HiddenBtns = ({ scene, onButtonClick }) => {
  return [1, 2, 3, 4, 5].map((buttonIndex) => {
    const hb = scene[`hb${buttonIndex}`];
    if (hb) {
      return (
        <TouchableOpacity
          key={buttonIndex}
          style={{
            position: "absolute",

            // for dev
            // backgroundColor: "red",

            width: parseInt(hb[`width`].slice(0, -2)),
            height: parseInt(hb[`height`].slice(0, -2)),
            top: parseInt(hb[`top`].slice(0, -2)) - 145,
            left: parseInt(hb[`left`].slice(0, -2)),
          }}
          onPress={() => onButtonClick(hb[`hf${buttonIndex}`])}
        />
      );
    }
    return null;
  });
};

export default HiddenBtns;

import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";
import MenuButton from "./Components/MenuButton";
import bg from "../src/images/11132.jpg";
import { ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import { Linking } from "react-native";

const About = () => {
  const [show, setShow] = useState("info");
  const lang = useSelector((state) => state.game.lang);
  //links
  const sendEmail = () => {
    Linking.openURL("mailto:cyanidium1@gmail.com?subject=Urbex%20Metro%20Game");
  };
  const openInstagramProfile = () => {
    Linking.openURL("https://www.instagram.com/cyanidium");
  };

  // lang settings
  let plot;
  switch (lang) {
    case "ru":
      plot = require("../src/plot/plotru.json");
      break;
    case "es":
      plot = require("../src/plot/plotes.json");
      break;
    case "de":
      plot = require("../src/plot/plotde.json");
      break;
    case "fr":
      plot = require("../src/plot/plotfr.json");
      break;
    case "ua":
      plot = require("../src/plot/plotua.json");
      break;
    default:
      plot = require("../src/plot/plot.json");
      break;
  }

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground source={bg} className="flex-1">
        <View className="z-10">
          <MenuButton text={plot.buttons.menu} />
        </View>
        <View className="flex-1 flex flex-row justify-between items-center m-1">
          <View className="space-y-4">
            <TouchableOpacity
              onPress={() => {
                setShow("info");
              }}
            >
              <Text
                style={show === "info" ? { color: "red" } : null}
                className="text-[#fcf6bd] text-xl font-bold bg-[#21252980] rounded text-center p-1"
              >
                FAQ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShow("about");
              }}
            >
              <Text
                style={show === "about" ? { color: "red" } : null}
                className="text-[#fcf6bd] text-xl font-bold bg-[#21252980] rounded text-center p-1"
              >
                {plot.buttons.aboutabout}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShow("contact");
              }}
            >
              <Text
                style={show === "contact" ? { color: "red" } : null}
                className="text-[#fcf6bd] text-xl font-bold bg-[#21252980] rounded text-center p-1"
              >
                {plot.buttons.contact}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShow("create");
              }}
            >
              <Text
                style={show === "create" ? { color: "red" } : null}
                className="text-[#fcf6bd] text-xl font-bold bg-[#21252980] rounded text-center p-1"
              >
                {plot.buttons.create}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="p-1 w-10/12">
            <Text className="text-[#ffffff] text-xl font-bold bg-[#21252980] rounded items-center ">
              {plot[show]}
            </Text>
            {show === "contact" && (
              <View className="flex flex-row justify-around mt-2">
                <TouchableOpacity onPress={openInstagramProfile}>
                  <Text className="text-[#fcf6bd] text-xl font-bold bg-[#21252980] rounded items-center p-2">
                    Instagram (@cyanidium)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={sendEmail}>
                  <Text className="text-[#fcf6bd] text-xl font-bold bg-[#21252980] rounded items-center p-2">
                    Email (cyanidium1@gmail.com)
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default About;

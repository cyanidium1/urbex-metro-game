import { Audio } from "expo-av";

let audio = null;

async function playSfxAsync(title) {
  console.log(title);
  let mp3 = null;

  switch (title) {
    case "train":
      mp3 = require("../sound/trainPassing.mp3");
      break;
    case "pumps":
      mp3 = require("../sound/pumps.mp3");
      break;
    case "metalSteps":
      mp3 = require("../sound/metalSteps.mp3");
      break;
    case "electricHum":
      mp3 = require("../sound/electricHum.mp3");
      break;
    case "tunnelWind":
      mp3 = require("../sound/tunnelWind.mp3");
      break;
    case "trainPassing2":
      mp3 = require("../sound/trainPassing2.mp3");
      break;
    case "horn":
      mp3 = require("../sound/horn.mp3");
      break;

    default:
      // mp3 = require("../sound/main.mp3");
      break;
  }
  console.log("sound", mp3);
  try {
    if (audio) {
      // Stop and unload the previous audio
      await audio.stopAsync();
      await audio.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(mp3);

    audio = sound;

    console.log("Playing Sound", title);
    await sound.playAsync();

    return sound;
  } catch (error) {
    console.error("Error playing music:", error);
    throw error;
  }
}

export default playSfxAsync;

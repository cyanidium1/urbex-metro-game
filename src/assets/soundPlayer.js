import { Audio } from "expo-av";

let audio = null;

async function playMusicAsync(title) {
  let mp3;

  switch (title) {
    case "silence":
      mp3 = require("../sound/silence.mp3");
      break;
    case "menu":
      mp3 = require("../sound/main.mp3");
      break;
    case "metro":
      mp3 = require("../sound/ambientWithMetalSounds.mp3");
      break;
    case "bunker":
      mp3 = require("../sound/ambientWater.mp3");
      break;
    default:
      mp3 = require("../sound/main.mp3");
      break;
  }

  try {
    if (audio) {
      await audio.stopAsync();
      await audio.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(mp3, { isLooping: true });

    audio = sound;

    await sound.playAsync();

    return sound;
  } catch (error) {
    console.error("Error playing music:", error);
    throw error;
  }
}

export default playMusicAsync;

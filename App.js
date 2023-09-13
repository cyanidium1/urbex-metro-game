import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homescreen from "./screens/Homescreen";
import Game from "./screens/Game";
import Intro from "./screens/Intro";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Homescreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Game"
          component={Game}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <Intro />
  );
}

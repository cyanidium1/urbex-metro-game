// build command
// eas build --profile development --platform android

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homescreen from "./screens/Homescreen";
import Game from "./screens/Game";
import Intro from "./screens/Intro";
import Finish from "./screens/Finish";

import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import Settings from "./screens/Settings";
import Toast from "react-native-toast-message";
import { PersistGate } from "redux-persist/integration/react";
import About from "./screens/About";
import Logo from "./screens/Logo";
import Guide from "./screens/Guide";

const Stack = createStackNavigator();

export default function App() {
  StatusBar.setHidden(true);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Logo">
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
            <Stack.Screen
              name="Finish"
              component={Finish}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="About"
              component={About}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Logo"
              component={Logo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Guide"
              component={Guide}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

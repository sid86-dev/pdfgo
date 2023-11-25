import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./lib/TabNavigator";
import * as SecureStore from "expo-secure-store";
import { generateId } from "./lib/utils";
import Toast from 'react-native-toast-message';

// Ignore log notification by message
LogBox.ignoreLogs(["Warning: ..."]);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    SecureStore.getItemAsync("token").then((token) => {
      if (token === null) {
        let id = generateId();
        SecureStore.setItemAsync("token", id);
      } else {
        console.log("token", token);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <TabNavigator />
      <Toast />
    </NavigationContainer>
  );
}

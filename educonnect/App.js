import "./firebaseConfig";
import Signin from "./screens/signin";
import Signup from "./screens/signup";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/welcome";
import React from "react";
import { StatusBar } from "react-native";
const stack = createNativeStackNavigator();





export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer theme={DarkTheme}>
        <stack.Navigator initialRouteName="Signin">
          <stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}

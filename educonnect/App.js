import "./firebaseConfig";
import Signin from "./screens/signin";
import Signup from "./screens/signup";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/welcome";
import React from "react";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import Topic from "./screens/topic";
import Account from "./screens/account";
import Discussion from "./screens/discussion";
const stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="light-content" />
          <NavigationContainer
            theme={{
              ...DarkTheme,
              colors: {
                ...DarkTheme.colors,
                background: "#000", // Set background color to black
              },
            }}
          >
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
              <stack.Screen
                name="Topic"
                component={Topic}
                options={{ headerShown: false }}
              />
              <stack.Screen
                name="Account"
                component={Account}
                options={{ headerShown: false }}
              />
              <stack.Screen
                name="Discussion"
                component={Discussion}
                options={{ headerShown: false }}
              />
            </stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}

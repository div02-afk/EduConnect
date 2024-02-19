import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StatusBar, TextInput ,BackHandler,Alert} from "react-native";
import styles from "../styles";

export default function Welcome({ navigation, onBackPress }) {
    useEffect(() => {
        const backhandling = () => {
          Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            { text: "YES", onPress: () => BackHandler.exitApp() },
          ]);
          return true;
        };
        BackHandler.addEventListener("hardwareBackPress", backhandling);
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", backhandling);
        };
      });

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.titleContainer, { height: "30%" }]}>
          <Text style={styles.title}>What do you want to learn today?</Text>
        </View>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#c6c6c6"
          style={styles.input}
        />
      </View>
    </>
  );
}

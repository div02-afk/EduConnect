import React, { useEffect } from "react";
import { View, Text, Pressable, BackHandler } from "react-native";
import styles from "../styles";
import Navbar from "./components/navbar";

export default function Topic({ route, navigation, onBackPress }) {
  const {id} = route.params;
  useEffect(() => {
    const backhandling = () => {
      if (onBackPress) {
        onBackPress(); // Call the onBackPress function from the props
      } else {
        navigation.goBack();
      }
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backhandling);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backhandling);
    };
  }, [onBackPress, navigation]);

  return (
    <>
    <View>
      <Text style={styles.title}>Topic for id {id}</Text>
    </View>
    <Navbar navigation={navigation} />
    </>
  );
}

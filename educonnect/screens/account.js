import React, { useEffect } from "react";
import { View, Text, Pressable, useAnimatedValue } from "react-native";
import Navbar from "./components/navbar";
import styles from "../styles";
import store from "../store/store";
import getName from "../databaseFunctions/getName";
export default function Account({ navigation, onBackPress }) {
  useEffect(() => {
    const name = getName(store.getState().email);
    // store.dispatch({ type: "SET_NAME", payload: {name:name} });
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Account</Text>
        <View style={styles.accountInfo}>
        <Text style={[styles.text,{fontSize:22}]}>{store.getState().name}</Text>
        <Text style={[styles.text,{fontSize:22}]}>{store.getState().email}</Text>
        
        </View>
        <Text style={styles.text}>Currently learning {store.getState().currentTopicName}</Text>
      </View>
      <Navbar navigation={navigation} />
    </>
  );
}

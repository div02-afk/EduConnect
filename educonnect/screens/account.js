import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import Navbar from "./components/navbar";
import styles from "../styles";
import store from "../store/store";


export default function Account({ navigation, onBackPress }) {
  const name = store.getState().name;
  const email = store.getState().email;
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Account</Text>
        <View style={styles.accountInfo}>
        <Text style={[styles.text,{fontSize:22}]}>{name}</Text>
        <Text style={[styles.text,{fontSize:22}]}>{email}</Text>
        
        </View>
        <Text style={styles.text}>Currently learning {store.getState().currentTopicName}</Text>
        <Pressable style= {[styles.button,{position:"absolute",bottom:60,backgroundColor:"gray"}]} onPress={()=>{navigation.navigate("Signin")}} >
          <Text style={[styles.text,{fontWeight:"bold"}]}>Log out</Text>
        </Pressable>
      </View>
      <Navbar navigation={navigation} />
    </>
  );
}

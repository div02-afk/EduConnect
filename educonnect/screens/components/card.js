import React from "react";
import { View, Text, Pressable,Image } from "react-native";
import openLink from "./openLink";
import styles from "../../styles";
import { getYouTubeVideoId } from "./thumbnail";

const shortener = (text, maxLength=14) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;

}

export default function Card({ title, description, link }) {
  return (
    <>
      <Pressable onPress={() => openLink(link)}>
        <View style={styles.card}>
          <View style ={{width:200, height:150, borderRadius:10,top:0,backgroundColor:"#171717", overflow:"hidden",flex:1,justifyContent:"center", alignItems:"center" }}>
          <Image src = {`https://img.youtube.com/vi/${getYouTubeVideoId(link)}/hqdefault.jpg`} style ={{width:200,height:150,objectFit: "contain" }} ></Image>
          </View>
          <Text style={styles.text}>{shortener(title)}</Text>
          <Text style={[styles.text,{fontSize:14}]}>{description}</Text>
        </View>
      </Pressable>
    </>
  );
}

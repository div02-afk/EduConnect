import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import openLink from "./openLink";
import styles from "../../styles";
import { getYouTubeVideoId } from "./thumbnail";

const shortener = (text, maxLength = 14) => {
  try{
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;}
  catch(e){
    return text
  }
};

export default function Card({ title, description, link,type ,thumbnail}) {
  // console.log(thumbnail)
  const thumbnailSrc = type === "video"?`https://img.youtube.com/vi/${getYouTubeVideoId(link)}/hqdefault.jpg`:thumbnail;
  // const thumbnailSrc = thumbnail;
  return (
    <>
      <Pressable onPress={() => openLink(link)} style={{ marginRight: 10 }}>
        <View style={styles.card}>
          <View
            style={{
              width: 200,
              height: 150,
              borderRadius: 10,
              backgroundColor: "#171717",
              overflow: "hidden",
            }}
          >
            <Image
              src={thumbnailSrc}
              // source={{uri:thumbnail}}
              style={{ width: 200, height: 150, objectFit: "contain",top:0 }}
            ></Image>
          </View>
          <Text style={styles.text}>{shortener(title)}</Text>
          <Text style={[styles.text, { fontSize: 14 }]}>{shortener(description,20)}</Text>
        </View>
      </Pressable>
    </>
  );
}

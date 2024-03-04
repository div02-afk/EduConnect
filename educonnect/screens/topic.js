import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  BackHandler,
  FlatList,
  ScrollView,
} from "react-native";
import styles from "../styles";
import Navbar from "./components/navbar";
import getTopicInfo from "../databaseFunctions/getTopicInfo";
import store from "../store/store";
import openLink from "./components/openLink";
import Card from "./components/card";
export default function Topic({ route, navigation, onBackPress }) {
  const id = store.getState().currentTopicId;
  const [topicInfo, setTopicInfo] = useState([]);
  useEffect(() => {
    getTopicInfo(id).then((result) => {
      setTopicInfo(result);
    });
  }, []);
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

  const sortedArray = {};
  topicInfo.forEach((obj) => {
    const subtopicPriority = obj.subTopicPriority;
    if (!sortedArray[subtopicPriority]) {
      sortedArray[subtopicPriority] = [];
    }
    sortedArray[subtopicPriority].push(obj);
  });
  const subTopicList = Object.values(sortedArray);
  return (
    <>
      <View>
        <Text onPress={()=>{navigation.navigate("Welcome")}} style={styles.title}>{store.getState().currentTopicName}</Text>
        <View style={[styles.subTopicList,{paddingTop:24}]}>
          {subTopicList.map((subtopic) => {
            return (
              <>
              
              <Text style={[{color:"#c6c6c6",paddingLeft:20,fontSize:24,textAlign:"left",width:"100%", marginBottom:10}]}>{subtopic[0].subTopic}</Text>
                <FlatList horizontal={true} data={subtopic} renderItem={({item}) => <Card title={item.title} description={item.description} link={item.link} subTopic= {item.subTopic} />}></FlatList>
                
              </>
            );
          })}
        </View>
      </View>
      <Navbar navigation={navigation} />
    </>
  );
}


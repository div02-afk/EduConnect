import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StatusBar,
  TextInput,
  BackHandler,
  Alert,
} from "react-native";
import styles from "../styles";
import getTopics from "../databaseFunctions/getTopics";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
export default function Welcome({ navigation, onBackPress }) {
  const [topics, setTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
  useEffect(() => {
    getTopics().then((result) => {
      // console.log(result);
      setTopics(result);
    });
  }, []);
  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
    <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={[styles.titleContainer, { height: "30%" }]}>
          <Text style={styles.title}>What do you want to learn today?</Text>
        </View>
        <TextInput
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          placeholder="Search"
          placeholderTextColor="#c6c6c6"
          style={styles.input}
        />
        {filteredTopics.map((topic) => {
          return (
            <Pressable
              style={styles.topicButton}
              key={topic.id}
              onPress={() => {
                navigation.navigate("Topic", { id: topic.id });
              }}
            >
              <Text style={styles.topicText}>{topic.name}</Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}

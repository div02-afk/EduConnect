import { Pressable, View, Keyboard } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHouse,
  faM,
  faMessage,
  faU,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles";
import { useNavigation } from "@react-navigation/native";

export default function Navbar({ navigation }) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [topicColor, setTopicColor] = useState("#fff");
  const [discussionColor, setDiscussionColor] = useState("#fff");
  const [accountColor, setAccountColor] = useState("#fff");
  const nav = useNavigation();
  const [currentScreen, setCurrentScreen] = useState('');

  useEffect(() => {
    const unsubscribe = nav.addListener('state', (e) => {
      // Get the current screen name
      setCurrentScreen(e.data.state.routes[e.data.state.index].name);
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
  if (currentScreen == "Topic") {
    setTopicColor("#00308F");
    setDiscussionColor("#fff");
    setAccountColor("#fff");
  }
  if (currentScreen == "Discussion") {
    setTopicColor("#fff");
    setDiscussionColor("#00308F");
    setAccountColor("#fff");
  }
  if (currentScreen == "Account") {
    setTopicColor("#fff");
    setDiscussionColor("#fff");
    setAccountColor("#00308F");
  }
},[currentScreen]);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      {keyboardVisible ? null : (
        <View
          style={{ position: "absolute", bottom: 0, height: 60, width: "100%" }}
        >
          <View style={styles.navBar}>
            <Pressable
              style={[styles.navbarButton]}
              onPress={() => {
                
                navigation.navigate("Topic");
              }}
            >
              <FontAwesomeIcon
                icon={faHouse}
                size={22}
                style={[styles.navbarIcon, { color: topicColor }]}
              />
            </Pressable>
            <Pressable
              style={styles.navbarButton}
              onPress={() => {
                
                navigation.navigate("Discussion");
              }}
            >
              <FontAwesomeIcon
                icon={faMessage}
                size={22}
                style={[styles.navbarIcon, { color: discussionColor }]}
              />
            </Pressable>
            <Pressable
              style={styles.navbarButton}
              onPress={() => {
                navigation.navigate("Account");
              }}
            >
              <FontAwesomeIcon
                icon={faUser}
                size={22}
                style={[styles.navbarIcon, { color: accountColor }]}
              />
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
}

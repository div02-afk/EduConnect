import { Pressable, View, Keyboard } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faMessage, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles";

export default function Navbar({ navigation }) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
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
        <View style={{position:"absolute", bottom: 0, height: 60, width: "100%" }}>
          <View style={styles.navBar}>
            <Pressable
              style={styles.navbarButton}
              onPress={() => {
                navigation.navigate("Topic");
              }}
            >
              <FontAwesomeIcon
                icon={faHouse}
                size={22}
                style={[styles.navbarIcon]}
              />
            </Pressable>
            <Pressable
              style={styles.navbarButton}
              onPress={() => {
                navigation.navigate("Discussion");
              }}
            >
              <FontAwesomeIcon
                icon={faUser}
                size={22}
                style={styles.navbarIcon}
              />
            </Pressable>
            <Pressable
              style={styles.navbarButton}
              onPress={() => {
                navigation.navigate("Account");
              }}
            >
              <FontAwesomeIcon
                icon={faMessage}
                size={22}
                style={styles.navbarIcon}
              />
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
}

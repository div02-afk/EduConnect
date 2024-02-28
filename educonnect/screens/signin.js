import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  StatusBar,
  ActivityIndicator,
  
} from "react-native";
import { LOGIN } from "../store/actionTypes";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import styles from "../styles";
import store from "../store/store";
import getName from "../databaseFunctions/getName";
import { current } from "@reduxjs/toolkit";


export default function Signin({ navigation, onBackPress }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    let oldEmail = store.getState().email;
    let oldName = store.getState().name;
    if (oldEmail !== "" && oldName !== "" && oldName !== "John Doe" && oldEmail !== "johndoe@gmail.com") {
      if(store.getState().currentTopicId !== "" && store.getState().currentTopicName !== "") {
      navigation.navigate("Topic");
    }
    else{
      navigation.navigate("Welcome");
    }
    }
  }, []);

  async function login(email, password) {
    console.log("logging in");
    let result = {};
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        console.log("logged in");
        const user = userCredential.user;

        setLoading(false);
        // navigation.navigate("Welcome");
        result = {
          user: user,
          success: true,
        };
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        result = {
          success: false,
          error: error,
        };
        setLoading(false);
        console.log(error);
        
      });
      return result;
  }
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
  async function signin() {
    if (email === "" || password === "") {
      return alert("Please fill in all fields");
    }
    setLoading(true);
    const result = await login(email, password);
    console.log(result);
    if (result.success) {
      const name = await getName(email);
      console.log(name, "in signin in");
      const data = {
        email: email,
        name: name,
      };
      console.log(data);
      store.dispatch({
        type: LOGIN,
        payload: data,
      });
      navigation.navigate("Welcome");
    }
    setEmail("");
    setPassword("");
  }
  function signup() {
    navigation.navigate("Signup");
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome Back</Text>
        </View>
        {/* <KeyboardAvoidingView behavior="padding" enabled> */}
        <TextInput
          placeholderTextColor="#656565"
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          placeholderTextColor="#656565"
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        {/* </KeyboardAvoidingView> */}
        {!isKeyboardVisible && (
          <>
            {Loading ? (
              <>
                <ActivityIndicator
                  size="small"
                  color={"#c6c6c6"}
                ></ActivityIndicator>
              </>
            ) : (
              <Pressable style={[styles.buttonSignin, styles.button]}>
                <Text
                  style={styles.buttonText}
                  onPress={() => {
                    signin();
                  }}
                >
                  Sign in
                </Text>
              </Pressable>
            )}
            <Pressable style={[styles.buttonSignup, styles.button]}>
              <Text
                style={styles.buttonText}
                onPress={() => {
                  signup();
                }}
              >
                Sign up
              </Text>
            </Pressable>
          </>
        )}
      </View>
      
    </>
  );
}

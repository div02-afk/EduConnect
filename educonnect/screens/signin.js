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


export default function Signin({ navigation, onBackPress }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  async function login(email, password) {
    console.log("logging in");
    if (store.getState().email !== "" && store.getState().name !== "") {
      navigation.navigate("Welcome");
      return;
    }
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        console.log("logged in");
        const user = userCredential.user;

        setLoading(false);
        // navigation.navigate("Welcome");
        const result = {
          user: user,
          success: true,
        };
        return result;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const result = {
          success: false,
          error: error,
        };
        setLoading(false);
        console.log(error);
        return result;
      });
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
    setEmail("");
    setPassword("");
    if (result.success) {
      const name = await getName(email);
      const data = {
        email: email,
        name: name,
      };
      store.dispatch({
        type: LOGIN,
        payload: data,
      });
      navigation.navigate("Welcome");
    }
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

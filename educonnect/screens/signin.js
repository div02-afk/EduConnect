import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  StatusBar,
} from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import styles from "../styles";

export default function Signin({ navigation, onBackPress }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  async function login(email, password) {
    console.log("logging in");
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("logged in");
        const user = userCredential.user;
        setLoading(false);
        navigation.navigate("Welcome");
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
    if(email === "" || password === ""){
      return alert("Please fill in all fields");
    
    }
    setEmail("");
    setPassword("");
    setLoading(true);
    const result = login(email, password);
    console.log(result);

    if (result.success === true) {
      setLoading(false);
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
                <Pressable style={[styles.buttonSignin, styles.button]}>
                  <Text
                    style={styles.buttonText}
                    onPress={() => {
                      signin();
                    }}
                  >
                    Signing in...
                  </Text>
                </Pressable>
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

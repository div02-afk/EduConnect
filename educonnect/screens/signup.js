import { TextInput, View, Text, Pressable ,StatusBar} from "react-native";
import styles from "../styles";
import React, { useState, useEffect } from "react";
import {auth} from "../firebaseConfig";
import {createUserWithEmailAndPassword } from "firebase/auth";

async function register(email,password){
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const result = {
            user: user,
            success: true
        
        };
        return result;
        // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorCode === "auth/email-already-in-use"){
          alert("Email already in use");}
        const result = {
            success: false,
            error: error
        };
        console.log(errorCode);
        return result;
        // ..
      });
    };


export default function Signup({ navigation, onBackPress }) {
  async function signup() {
    if (name === "" || email === "" || password === "") {
      return alert("Please fill in all fields");
    }
    if (password.length < 6) {
      return alert("Password must be at least 6 characters long");
    }
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }
    const result = await register(email, password);
    if (result.success) {
      navigation.navigate("Welcome");
    }
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
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
    <StatusBar barStyle="light-content" />
    <View style={styles.container}>
      <View style={[styles.titleContainer, { height: "30%" }]}>
        <Text style={styles.title}>Welcome Aboard</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#656565"
        value={name}
        onChangeText={(text) => setName(text)}
        autoCapitalize={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#656565"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#656565"
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize={false}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#656565"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        autoCapitalize={false}
        secureTextEntry={true}
      />
      {!isKeyboardVisible && (
        <Pressable style={[styles.button, styles.buttonSignup]}>
          <Text
            style={styles.buttonText}
            onPress={() => {
              signup();
            }}
          >
            Sign up
          </Text>
        </Pressable>
      )}
    </View>
    </>
  );
}

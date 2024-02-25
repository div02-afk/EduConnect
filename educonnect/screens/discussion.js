import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  ScrollView,
} from "react-native";

import Navbar from "./components/navbar";
import styles from "../styles";
import store from "../store/store";
import MessageBox from "./components/messageBox";
import { io } from "socket.io-client";
import addMessage from "../databaseFunctions/addMessage";
import getMessages from "../databaseFunctions/getMessages";
export default function Discussion({ navigation, onBackPress }) {
  getMessages(store.getState().currentTopicName);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState(store.getState().messages);
  const [message, setMessage] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const flatListRef = useRef();
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
  }, [Keyboard]);

  const sendMessage = () => {
    if (message === "") {
      return;
    }
    addMessage(store.getState().currentTopicName, message, "text");
    const data = {
      message: message,
      sender: store.getState().name,
      topic: store.getState().currentTopicName,
    };
    // console.log(data);
    socket?.emit("message", data);
    setMessage("");
  };
  useEffect(() => {
    socket?.on("message", (newMessage) => {
      console.log(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, [socket]);
  useEffect(() => {
    const socket = io("https://educonnect-38i3.onrender.com");
    console.log("joining ", store.getState().currentTopicId);
    socket?.on("connect", () => {
      console.log("connected");
      socket?.emit("join", store.getState().currentTopicName);
    });
    setSocket(socket);
  }, []);
  // useEffect(() => {
  //   flatListRef.current.scrollToEnd({ animated: true });
  // }, [messages]);
  return (
    <>
      <View style={[styles.container]}>
        <Text style={styles.title}>Discussion</Text>

        <View
          style={{
            // borderWidth: 1,
            // borderColor: "white",
            width: "100%",
            height: "80%",
            zIndex: 2,
          }}
        >
          <FlatList
            style={{
              flex: 1,
              // borderWidth: 1,
              // borderColor: "red",
              flexDirection: "column-reverse",
            }}
            data={messages}
            ref={flatListRef}
            onContentSizeChange={() =>
              flatListRef.current.scrollToEnd({ animated: true })
            }
            renderItem={({ item }) => (
              <MessageBox message={item.message} sender={item.sender} />
            )}
          ></FlatList>
        </View>
        <View
          style={[
            {
              flex: 1,
              flexDirection: "row",
              width: "100%",
              position: "absolute",
            },
            isKeyboardVisible
              ? {bottom:0}
              : {
                  bottom: 60,
                },
          ]}
        >
          <TextInput
            value={message}
            onChangeText={(text) => {
              setMessage(text);
            }}
            placeholder="Write your message"
            placeholderTextColor="#656565"
            style={[
              styles.input,
              {
                fontSize: 16,
                padding: 10,
                margin: "auto",
                marginLeft: 10,
                width: "80%",
                height: 40,
              },
            ]}
          ></TextInput>
          <Pressable
            style={{
              width: 45,
              height: 45,
              marginLeft: 10,
              borderRadius: 20,
              backgroundColor: "white",
            }}
            onPress={() => {
              console.log("sending message");
              sendMessage();
            }}
          ></Pressable>
        </View>
      </View>
      <Navbar navigation={navigation} />
    </>
  );
}

import React, { useEffect, useState } from "react";
import { View, Text, Pressable, TextInput, Keyboard } from "react-native";
import Navbar from "./components/navbar";
import styles from "../styles";
import store from "../store/store";
// import { socket } from "./components/socket";
import { io } from "socket.io-client";
export default function Discussion({ navigation, onBackPress }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessges] = useState([]);
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    const data = {
      message: message,
      sender: store.getState().name,
      topic: store.getState().currentTopicName,
    };
    console.log(data);
    socket?.emit("message", data);
    setMessage("");
    Keyboard.dismiss();
  };
  useEffect(() => {
    socket?.on("message", (message) => {
      setMessges([...messages, message]);
    });
  }, [socket]);
  useEffect(() => {
    const socket = io("ws://localhost:3000");
    console.log("joining ", store.getState().currentTopicId);
    socket?.on("connect", () => {
        console.log("connected");
        socket?.emit("join", store.getState().currentTopicName);
    });
    setSocket(socket);
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Discussion</Text>
        {messages.map((message, index) => (
          <View key={index} style={styles.messageBox}>
            <Text style={styles.messageSender}>{message.sender}</Text>
            <Text key={index} style={styles.messageText}>
              {message.message}
            </Text>
          </View>
        ))}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "100%",
            position: "absolute",
            bottom: 80,
          }}
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
              sendMessage();
            }}
          ></Pressable>
        </View>
      </View>
      <Navbar navigation={navigation} />
    </>
  );
}

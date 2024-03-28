import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Button, Input } from "@rneui/themed";
import React, { useState, useEffect, useRef } from "react";
import socket from "../utils/socket";
import { FontAwesome } from "@expo/vector-icons";
import MyMessage from "../components/MyMessage";
import OtherMessage from "../components/OtherMessage";
import ConnectionMessage from "../components/ConnectionMessage";

const Home = ({ route }) => {
  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const { username } = route.params;
  const input = useRef();
  const scrollViewRef = useRef();

  useEffect(() => {
    // When messages change, scroll to the bottom
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messagesList]);

  useEffect(() => {
    setId(socket.id);
    socket.emit("message", {
      message: username + " has connected",
      type: "connectUser",
    });
  }, [socket]);

  // when pressing enter send the text
  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Enter") {
      send();
      input.focus();
    }
  };

  socket.on("message", (message) => {
    setMessagesList([...messagesList, message]);
  });

  const send = () => {
    // get the current time format - hh:mm
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${minutes}`;

    socket.emit("message", { message, username, type: "text", id, time });
    setMessage("");
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
      >
        {messagesList.map((message, index) =>
          message.type === "connectUser" ? (
            <ConnectionMessage message={message} key={index} />
          ) : message.id === id ? (
            <MyMessage key={index} message={message} />
          ) : (
            <OtherMessage key={index} message={message} />
          )
        )}
      </ScrollView>
      <SafeAreaView style={styles.sendContainer}>
        <View style={{ width: "80%" }}>
          <Input
            value={message}
            onChangeText={setMessage}
            onKeyPress={handleKeyPress}
            ref={input}
          />
        </View>
        <View style={{ width: "15%" }}>
          <Button buttonStyle={{ backgroundColor: "#ffffff" }} onPress={send}>
            <FontAwesome name="send-o" size={24} color="black" />
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "85%",
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  sendContainer: {
    backgroundColor: "#fff",
    height: "15%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default Home;

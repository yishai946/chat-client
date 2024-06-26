import { ScrollView, StyleSheet, View, SafeAreaView } from "react-native";
import { Button, Input } from "@rneui/themed";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import MyMessage from "../components/MyMessage";
import OtherMessage from "../components/OtherMessage";
import ConnectionMessage from "../components/ConnectionMessage";
import { useAppContext } from "../AppContext";

const Home = () => {
  const { messagesList, send, user } = useAppContext();
  const [message, setMessage] = useState("");
  const input = useRef();
  const scrollViewRef = useRef();

  useEffect(() => {
    // When messages change, scroll to the bottom
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messagesList]);

  // when pressing enter send the text
  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Enter") {
      send(message);
      setMessage("");
      input.focus();
    }
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
          marginTop: 20,
        }}
      >
        {messagesList &&
          messagesList.map((message, index) =>
            message.type === "user" ? (
              <ConnectionMessage message={message} key={index} />
            ) : message.user.id === user.id ? (
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
          <Button
            buttonStyle={{ backgroundColor: "#ffffff" }}
            onPress={() => {
              send(message);
              setMessage("");
            }}
          >
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

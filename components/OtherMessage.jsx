import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "@rneui/base";

const OtherMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Text style={styles.name}>{message.user.username}</Text>
        <Text style={styles.text}>{message.message}</Text>
        <Text style={styles.subText}>{message.time}</Text>
      </View>
      <Avatar size={32} rounded source={{ uri: message.user.image }} />
    </View>
  );
};

export default OtherMessage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10,
  },
  message: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#5b5b5b",
    padding: 10,
    flexWrap: "wrap",
    gap: 5,
  },
  text: {
    color: "white",
  },
  subText: {
    color: "white",
    fontSize: 10,
  },
  name: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import TextAvatar from "react-native-text-avatar";


const MyMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Text style={styles.text}>{message.message}</Text>
        <Text style={styles.subText}>{message.time}</Text>
      </View>
    </View>
  );
};

export default MyMessage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    marginTop: 10,
    gap: 10,
  },
  message: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#00a000",
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
});

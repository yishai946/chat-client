import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import TextAvatar from "react-native-text-avatar";

function colorHash(inputString) {
  var sum = 0;

  for (var i in inputString) {
    sum += inputString.charCodeAt(i);
  }

  r = ~~(
    ("0." +
      Math.sin(sum + 1)
        .toString()
        .substr(6)) *
    256
  );
  g = ~~(
    ("0." +
      Math.sin(sum + 2)
        .toString()
        .substr(6)) *
    256
  );
  b = ~~(
    ("0." +
      Math.sin(sum + 3)
        .toString()
        .substr(6)) *
    256
  );

  var rgb = "rgb(" + r + ", " + g + ", " + b + ")";

  var hex = "#";

  hex += ("00" + r.toString(16)).substr(-2, 2).toUpperCase();
  hex += ("00" + g.toString(18)).substr(-2, 2).toUpperCase();
  hex += ("00" + b.toString(20)).substr(-2, 2).toUpperCase();

  return {
    r: r,
    g: g,
    b: b,
    rgb: rgb,
    hex: hex,
  };
}

const OtherMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Text style={styles.name}>{message.user.username}</Text>
        <Text style={styles.text}>{message.message}</Text>
        <Text style={styles.subText}>{message.time}</Text>
      </View>
      <TextAvatar
        backgroundColor={colorHash(message.user.username).hex}
        textColor={"white"}
        size={40}
        type={"circle"}
      >
        {message.user.username}
      </TextAvatar>
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

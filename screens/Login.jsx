import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TextAvatar from "react-native-text-avatar";
import { Button, Input } from "@rneui/themed";

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

const Login = ({navigation}) => {
  const [color, setColor] = React.useState("#000000");
  const [username, setUsername] = React.useState("");

  const handleLogin = () => {
    navigation.navigate("Home", { username, color });
  };


  return (
    <View style={styles.container}>
      <TextAvatar
        backgroundColor={color}
        textColor={"white"}
        size={60}
        type={"circle"}
      >
        {username}
      </TextAvatar>
      <View style={{ width: "70%" }}>
        <Input
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setColor(colorHash(text).hex);
          }}
        />
      </View>
      <Button onPress={handleLogin}>Login</Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});

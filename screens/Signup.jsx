import { Button, Input } from "@rneui/themed";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextAvatar from "react-native-text-avatar";
import { useAppContext } from "../AppContext";
import { auth, db } from "../utils/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const Signup = ({ navigation }) => {
  const [color, setColor] = useState("#000000");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup event handler
  const handleSignup = async () => {
    try {
      // store user in async storage
      AsyncStorage.setItem("username", username);
      AsyncStorage.setItem("email", email);

      // create user in auth
      await createUserWithEmailAndPassword(auth, email, password);

    } catch (error) {
      console.log(error);
    }
  };

  // enter event handler
  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Enter") {
      handleSignup();
    }
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
          inputStyle={{ padding: 10 }}
          placeholder="Username"
          value={username}
          onKeyPress={handleKeyPress}
          onChangeText={(text) => {
            setUsername(text);
            setColor(colorHash(text).hex);
          }}
        />
        <Input
          inputStyle={{ padding: 10 }}
          placeholder="Email"
          value={email}
          onKeyPress={handleKeyPress}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          inputStyle={{ padding: 10 }}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onKeyPress={handleKeyPress}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button onPress={handleSignup}>Signup</Button>
      <Text>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "royalblue" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});

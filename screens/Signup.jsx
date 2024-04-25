import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Input, Avatar } from "@rneui/themed";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../utils/firebaseConfig";
import * as ImagePicker from "expo-image-picker";

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(
    "https://i.pinimg.com/736x/5e/39/6b/5e396bb1b17681759922dd10f8a9d702.jpg"
  );

  // signup event handler
  const handleSignup = async () => {
    try {
      if (
        image ==
          "https://i.pinimg.com/736x/5e/39/6b/5e396bb1b17681759922dd10f8a9d702.jpg" ||
        !username ||
        !email ||
        !password
      ) {
        alert("Please select an image and fill all fields");
        return;
      }
      // store user in async storage
      AsyncStorage.setItem("username", username);
      AsyncStorage.setItem("email", email);
      AsyncStorage.setItem("image", image);

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Avatar
          size={60}
          rounded
          source={{
            uri: image,
          }}
        />
      </TouchableOpacity>
      <View style={{ width: "70%" }}>
        <Input
          inputStyle={{ padding: 10 }}
          placeholder="Username"
          value={username}
          onKeyPress={handleKeyPress}
          onChangeText={(text) => setUsername(text)}
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

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, {useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { Button, Input } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      AsyncStorage.setItem("email", email);

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        if (Platform.OS === "web") {
          alert("Invalid Email", "Please enter a valid email address");
        } else {
          Alert.alert("Invalid Email, Please enter a valid email address");
        }
      }
      if (error.code === "auth/invalid-credential") {
        if (Platform.OS === "web") {
          alert("Invalid Credential, password or email are incorrect");
        } else {
          Alert.alert("Invalid Credential", "Please enter a valid password");
        }
      }
    }
  };

  // enter event handler
  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "70%" }}>
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
      <Button onPress={handleLogin}>Login</Button>
      <Text>Don't have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={{ color: "royalblue" }}>Signup</Text>
      </TouchableOpacity>
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

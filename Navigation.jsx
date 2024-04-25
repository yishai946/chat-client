import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Private from "./screens/Private";
import { useAppContext } from "./AppContext";
import Signup from "./screens/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "./utils/firebaseConfig";
import { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import socket from "./utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Avatar } from "@rneui/base";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const ChatDrawer = () => {
  const { users, logout } = useAppContext();
  const [id, setId] = useState("");

  useEffect(() => {
    const getId = async () => {
      setId(await AsyncStorage.getItem("id"));
    };
    getId();
  }, []);

  return (
    id && (
      <Drawer.Navigator initialRouteName="General">
        <Drawer.Screen
          name="General"
          component={Home}
          options={{
            headerShown: true,
            title: "General",
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 10 }} onPress={logout}>
                <Text style={{ color: "red" }}>Logout</Text>
              </TouchableOpacity>
            ),
          }}
        />
        {users.map(
          (user, index) =>
            user.id != id && (
              <Drawer.Screen
                key={index}
                name={user.id.toString()}
                component={Private}
                initialParams={{ user2: user }}
                options={{
                  title: user.username,
                  headerRight: () => (
                    <View style={{ marginRight: 20 }}>
                      <Avatar size={32} rounded source={{ uri: user.image }} />
                    </View>
                  ),
                }}
              />
            )
        )}
      </Drawer.Navigator>
    )
  );
};

const Navigation = () => {
  const { user, setUser } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (newUser) => {
      try {
        setLoading(true);
        if (newUser) {
          let username = await AsyncStorage.getItem("username");
          let email = await AsyncStorage.getItem("email");
          let image = await AsyncStorage.getItem("image");

          const docRef = doc(db, "users", newUser.uid);
          const docSnap = await getDoc(docRef);

          // if user doc does not exist, create it
          if (!docSnap.exists() && username && email) {
            // upload image to storage
            if (image) {
              const response = await fetch(image);
              const blob = await response.blob();
              const storageRef = ref(storage, `images/${newUser.uid}`);
              const uploadTask = uploadBytesResumable(storageRef, blob);

              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      break;
                  }
                },
                (error) => {
                  console.error("Error uploading image:", error);
                },
                () => {
                  // Image upload completed successfully
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (downloadURL) => {
                      image = downloadURL;
                      // Update image URI in AsyncStorage
                      await AsyncStorage.setItem("image", image);
                      // Create user document in Firestore
                      await setDoc(doc(db, "users", newUser.uid), {
                        username,
                        email,
                        image,
                      });
                    })
                    .catch((error) => {
                      console.error("Error getting download URL:", error);
                    });
                }
              );
            }

            // set image in async storage
            await AsyncStorage.setItem("image", image);

            // create user doc in firestore
            await setDoc(doc(db, "users", newUser.uid), {
              username,
              email,
              image,
            });
          } else {
            // get user doc from firestore
            username = docSnap.data().username;
            email = docSnap.data().email;
            image = docSnap.data().image;

            // set username and email in async storage
            await AsyncStorage.setItem("username", username);
            await AsyncStorage.setItem("email", email);
            await AsyncStorage.setItem("image", image);
          }

          // set id in async storage
          await AsyncStorage.setItem("id", newUser.uid);

          // set user in context
          setUser({
            username,
            email,
            id: newUser.uid,
            image,
          });

          // connect user to socket
          socket.emit("connectUser", {
            username,
            email,
            id: newUser.uid,
            image,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return loading ? (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : user.id === "" ? (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Login"}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={ChatDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

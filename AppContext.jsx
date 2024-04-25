import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket from "./utils/socket";
import { auth } from "./utils/firebaseConfig";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState({
    email: "",
    username: "",
    id: "",
  });

  const logout = async () => {
    await socket.emit("disconnectUser", user);
    setUser({
      email: "",
      username: "",
      id: "",
    });
    setUsers([]);
    setMessagesList([]);
    AsyncStorage.clear();
    await auth.signOut();
  };

  const send = (message) => {
    // get the current time format - hh:mm
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${minutes}`;

    socket.emit("message", { message, user, time, type: "text" });
  };

  const sendPrivate = (message, to) => {
    // get the current time format - hh:mm
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${minutes}`;

    socket.emit("privateMessage", { message, user, time, to });
  };

  socket.on("message", (messages) => {
    setMessagesList(messages);
  });

  socket.on("privateMessage", (data) => {
    if (data.id1 == user.id || data.id2 == user.id) {
      setChats(data.userChats);
    }
  });

  socket.on("connectUser", (data) => {
    setUsers(data.users);
    setMessagesList(data.generalMessages);
    setChats(data.userChats);
  });

  socket.on("disconnectUser", (data) => {
    setUsers(data.users);
    setMessagesList(data.generalMessages);
  });

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        user,
        setUser,
        messagesList,
        setMessagesList,
        logout,
        send,
        sendPrivate,
        chats,
        sendPrivate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

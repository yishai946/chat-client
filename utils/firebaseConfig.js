// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNlZsxSUkZ2tZKI6hXTiMTVmb462HDoTE",
  authDomain: "chat-444b8.firebaseapp.com",
  projectId: "chat-444b8",
  storageBucket: "chat-444b8.appspot.com",
  messagingSenderId: "279337038095",
  appId: "1:279337038095:web:93c03cd2e35265e4f98e7a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// นำค่าเหล่านี้มาจาก Firebase Console ของคุณ
const firebaseConfig = {
  apiKey: "AIzaSyD4XRieAgNqeN4TsWSFi4tfeUGL9-eJ9vs",
  authDomain: "ascampweb.firebaseapp.com",
  projectId: "ascampweb",
  storageBucket: "ascampweb.firebasestorage.app",
  messagingSenderId: "94362381010",
  appId: "1:94362381010:web:1bc25d854d1a2205515b0b",
  measurementId: "G-4S09Y4YD9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
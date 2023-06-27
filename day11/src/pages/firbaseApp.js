import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore } from "firebase/firestore";
import "./login.css"
const firebaseConfig = {
  apiKey: "AIzaSyBFwEUzYf4_Ojr-SYib-uFjfGf1cVwYpXQ",
  authDomain: "chat-app-cc9fb.firebaseapp.com",
  projectId: "chat-app-cc9fb",
  storageBucket: "chat-app-cc9fb.appspot.com",
  messagingSenderId: "790216418094",
  appId: "1:790216418094:web:efa8fa711f6691dd7a90bf"
};
export const firebaseapp = initializeApp(firebaseConfig);
export const db=getFirestore(firebaseapp)
export const usersDoc = doc(collection(db, "users"))

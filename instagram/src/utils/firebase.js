// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage,ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV-vAB3gEDj15bC5HeGfK8JAnyTtY7a3I",
  authDomain: "instagram-52bd7.firebaseapp.com",
  projectId: "instagram-52bd7",
  storageBucket: "instagram-52bd7.appspot.com",
  messagingSenderId: "268032204230",
  appId: "1:268032204230:web:142e582c7156fd6300e6c7"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db =getFirestore(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp,"gs://instagram-52bd7.appspot.com");
export const firebaseStorageRef=ref(firebaseStorage);
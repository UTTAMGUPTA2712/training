import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUserAuth } from "../redux/reducer/authSlice";
import "./login.css"
import googleimage from "../assets/images/googleicon.png"
const firebaseConfig = {
    apiKey: "AIzaSyBbBIqhM7AiUKBqbCJTbI1hXhzg7s9JcAs",
    authDomain: "login-project-7effd.firebaseapp.com",
    projectId: "login-project-7effd",
    storageBucket: "login-project-7effd.appspot.com",
    messagingSenderId: "1029877870058",
    appId: "1:1029877870058:web:08baacb3281c5e21ced693",
    measurementId: "G-KTZ1172MFN"
};
export const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseapp);
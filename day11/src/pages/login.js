import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUserAuth } from "../redux/reducer/authSlice";
import googleimage from "../assets/images/googleicon.png"
import { firebaseapp } from "./firbaseApp";
import "./login.css"
const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseapp);
const Login = () => {
    const [uservalue, setUserValue] = useState()
    const dispatch = useDispatch()
    const signin = async () => {
        const sign = await signInWithPopup(auth, provider)
        setUserValue(sign)
        dispatch(saveUserAuth(sign))
    }
    return (
        <>
            <div id="home">
            <div id="login">
                <h1>Here you can Login</h1>
                <h4>Let's join us :)</h4>
                <br />
                <p>Email</p>
                <input type="email" /><br />
                <p>Password</p>
                <input type="password" /><br /><br />
                <button>LOGIN</button><br />
                <button id="google" onClick={signin}><img src={googleimage}/> LOGIN WITH GOOGLE</button>
            </div></div>
        </>)
}
export default Login
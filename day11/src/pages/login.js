import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { saveUserAuth } from "../redux/reducer/authSlice";
import googleimage from "../assets/images/googleicon.png";
import { db, firebaseapp } from "./firbaseApp";
import "./login.css";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { RandomId } from "../component/randomid";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseapp);

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({ userId: RandomId(),chatroom:[],online: true, });
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const signin = async () => {
    try {
      const sign = await signInWithPopup(auth, provider);
      const id = await exist(sign.user.email)
      console.log("id",id.id);
      if (id!="") {
        const data = {
          userId:id.data().userId ,
          name: id.data().name,
          email: id.data().email,
          photo: id.data().photoURL,
          chatroom:[],
          online: true,
          id: id.id
        };
        updateDoc(doc(db,"users",id.id),{online: true});
        dispatch(saveUserAuth(data));
      } else {
        var data = {
          userId: RandomId(),
          name: sign.user.displayName,
          email: sign.user.email,
          photo: sign.user.photoURL,
          chatroom:[],
          online: true,
        };
        await addDoc(collection(db, "users"), data);
        const newid = await exist(sign.user.email)
        data = { ...data, id: newid }
        dispatch(saveUserAuth(data));
      }
    }
    catch (err) { console.log(err); }
  };
  const exist = async (email) => {
    const userdata = await getDocs(collection(db, "users"));
    const existuser = userdata.docs.filter((user) => {console.log(user.data().email,email);return user.data().email === email;});
    if (existuser.length>0) { return existuser[0]; } else { return ""; }
  }
  const saveuser = async (data) => {
    try {
      dispatch(saveUserAuth(data));
      const userdata = await getDocs(collection(db, "users"));
      const existuser = userdata.docs.filter((user) => user.data().email === data.email);
      console.log("'''''''''''''''''''''''''''''''''", existuser)
      if (existuser.length) { } else {
        try {
          await addDoc(collection(db, "users"), data);
        } catch (err) {
          console.log("Error while adding doc", err);
        }
      }
      setShow(true);
      setUser({});
    } catch (err) { console.log(err) }
  };
  const handlemanuallogin = () => {
    setShow(false);
  };

  const handlesave = () => {
    saveuser(user);
  };

  const handlechange = (type, value) => {
    setUser((prevState) => ({ ...prevState, [type]: value }));
  };
  return (
    <>
      <div id="home">
        <div id="login">
          <h1>Here you can Login</h1>
          <h4>Let's join us :)</h4>
          <br />
          {show && (
            <>
              <p>Email</p>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  handlechange("email", e.target.value);
                }}
                value={email}
                type="email"
              />
              <br />
              <p>Password</p>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
              />
              <br />
              <br />
              <button disabled={!((/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) && (password.length >= 8))} onClick={handlemanuallogin}>
                LOGIN
              </button>
              <br />
            </>
          )}
          {!show && (
            <>
              <p>Provide a Username</p>
              <input
                onChange={(e) => handlechange("name", e.target.value)}
                type="text"
              />
              <br />
              <p>Provide a imageURL</p>
              <input
                onChange={(e) => handlechange("photo", e.target.value)}
                type="text"
              />
              <br />
              <br />
              <button onClick={handlesave}>SAVE</button>
            </>
          )}
          <button id="google" onClick={signin}>
            <img src={googleimage} alt="Google Icon" /> LOGIN WITH GOOGLE
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

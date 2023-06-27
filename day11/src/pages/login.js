import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUserAuth } from "../redux/reducer/authSlice";
import googleimage from "../assets/images/googleicon.png"
import { db, firebaseapp } from "./firbaseApp";
import "./login.css"
import { addDoc, collection, getDocs } from "firebase/firestore";
import { RandomId } from "../component/randomid";
const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseapp);
const Login = () => {
    // const [uservalue, setUserValue] = useState()
    const [user,setUser] = useState({userId:RandomId()})
    const [show,setShow]=useState(true)
    const dispatch = useDispatch()
    const signin = async () => {
        const sign = await signInWithPopup(auth, provider)
        // setUserValue(sign)
        const data = {
            userId: RandomId(),
            name: sign.user.displayName,
            email: sign.user.email,
            photo: sign.user.photoURL
        }
        saveuser(data)
    }
    const saveuser=async (data)=>{
        console.log("",data)
        dispatch(saveUserAuth(data))
        const userdata = await getDocs(collection(db, "users"))
        const existuser = userdata.docs.filter((user) => user.email == data.email)
        console.log("jbaskbxasbxkasbxk",!existuser.exists)
        if (!existuser.exists) {
            try {
                await addDoc(collection(db, "users"), data)
            }
            catch (err) {
                console.log("Error while adding doc", err);
            }
            // console.log("", sign)
        }
        setShow(true)
        setUser({})
    }
    const handlemanuallogin = () => {
        setShow(false)
    }
    const handlesave=()=>{
        saveuser(user)
    }
    const handlechange=(type,value)=>{
        setUser(p=>({...p,[type]:value}))
    }
    console.log("",user)
    return (
        <>
            <div id="home">
                <div id="login">
                    <h1>Here you can Login</h1>
                    <h4>Let's join us :)</h4>
                    <br />
                    {(show)&&<><p>Email</p>
                    <input onChange={(e)=>handlechange("email",e.target.value)} type="email" /><br/>
                    <p>Password</p>
                    <input  type="password" /><br /><br />
                    <button onClick={handlemanuallogin}>LOGIN</button><br /></>}
                    {(!show)&&<>
                    <p>Provide a Username</p>
                    <input onChange={(e)=>handlechange("name",e.target.value)} type="text"/><br/>
                    <p>Provide a imageURL</p>
                    <input onChange={(e)=>handlechange("photo",e.target.value)} type="text"/><br/><br/>
                    <button onClick={handlesave}>SAVE</button>
                    </>}
                    <button id="google" onClick={signin}><img src={googleimage} /> LOGIN WITH GOOGLE</button>
                </div></div>
        </>)
}
export default Login
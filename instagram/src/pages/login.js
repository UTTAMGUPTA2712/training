import { useDispatch } from "react-redux"
import phoneimage from "../assets/images/phoneimage.png"
import { useState } from "react"
import { db } from "../utils/firebase";
import {  doc, updateDoc } from "firebase/firestore";
import { CheckUsers } from "../utils/checkUsers";
import { saveAuthDetail } from "../reducer/authslice";
import { Google } from "../utils/google";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logoblack.png"
const Login = () => {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [valid, setValid] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const LoginWIthGoogle = async () => {
        const data = await Google()
        dispatch(saveAuthDetail(data))
    }
    const ManualLogin = async () => {
        const userData = await CheckUsers(Email, Password)
        if (userData === "") {
            setValid(true)
        } else {
            await updateDoc(doc(db, "Users", userData?.[0].data().userId), { online: true })
            dispatch(saveAuthDetail(userData?.[0].data()))
        }
    }
    return (
        <>
            <div id="Authhome">
                <div style={{ display: "-webkit-inline-box" }}>
                    <img src={phoneimage} alt="phone image"/>
                    <div>
                        <div id="login">
                            <img src={logo} alt="logo"/>
                            <br /><br />
                            <input value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            <input value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            <button disabled={!Email} onClick={ManualLogin}>Log in</button>
                            <h4>OR</h4>
                            <button onClick={LoginWIthGoogle}>Login with Google</button>
                            {valid && <span>User doesnot exist(Email or Password incorrect)</span>}
                        </div>
                        <div id="route">
                            <p>Don't have an account? <span onClick={() => navigate("/signup")}>Sign up</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login
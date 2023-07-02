import { useDispatch } from "react-redux"
import phoneimage from "../assets/images/phoneimage.png"
import { useState } from "react"
import { CheckUsers } from "../utils/checkUsers";
import { AddUser } from "../utils/adduser";
import { saveAuthDetail } from "../reducer/authslice";
import { Google } from "../utils/google";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logoblack.png"

const SignUp = () => {
    const [user, setUser] = useState({ photo: "https://img.icons8.com/?size=512&id=83190&format=png" })
    const [valid, setValid] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const SignUpWIthGoogle = async (e) => {
        e.preventDefault()
        const data = await Google()
        dispatch(saveAuthDetail(data))
        navigate("/")
    }
    const saveUser = (title, value) => {
        setUser((p) => { return { ...p, [title]: value } })
    }
    const ManualSignUp = async (e) => {
        e.preventDefault()
        const userData = await CheckUsers(user.email)
        if (userData === "") {
            const data = await AddUser(user)
            dispatch(saveAuthDetail(data))
            navigate("/")
        } else {
            setValid(true)
        }
    }
    return (
        <>
            <div id="Authhome">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={phoneimage} alt="phone"/>
                    <div>
                        <div id="login">
                            <img src={logo} alt="logo"/>
                            <h4>Sign up to see photos and videos from your friends.</h4>
                            <form action="/">
                                <button onClick={SignUpWIthGoogle}>Signup With Google</button>
                                <h4>OR</h4>
                                <input value={user?.username} onChange={(e) => saveUser("username", e.target.value)} placeholder="Username" />
                                <input value={user?.email} onChange={(e) => saveUser("email", e.target.value)} placeholder="Email" />
                                <input value={user?.password} onChange={(e) => saveUser("password", e.target.value)} placeholder="Password" />
                                <p>
                                    People who use our service may have uploaded your contact information to Instagram. Learn More</p><p>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .
                                </p>
                                <button disabled={!(user?.username && user.email && user.password)} onClick={ManualSignUp}>Sign up</button>
                                {valid && <span>User Already Exist</span>}
                            </form>
                        </div>
                        <div id="route">
                            <p>Have an account? <span onClick={() => navigate("/")}>Log in</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignUp
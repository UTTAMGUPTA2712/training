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
    // setting up initial user data incase of manual login 
    const [user, setUser] = useState({ photo: "https://img.icons8.com/?size=512&id=83190&format=png" })
    // to check weather the user exist or not
    const [valid, setValid] = useState(false)
    // to dispatch the action
    const dispatch = useDispatch()
    // to navigate through router
    const navigate = useNavigate()
    // signup through google auth component
    const SignUpWIthGoogle = async (e) => {
        e.preventDefault()
        const data = await Google()
        dispatch(saveAuthDetail(data))
        // after signing up setting user data in store and moving to homepage
        navigate("/")
    }
    // saveing the user detail 
    const saveUser = (title, value) => {
        setUser((p) => { return { ...p, [title]: value } })
    }
    // manual signup 
    const ManualSignUp = async (e) => {
        e.preventDefault()
        //  checking if user exist
        const userData = await CheckUsers(user.email)
        if (userData === "") {
            // if user doesnot exist add it then save in store and move to homepage 
            const data = await AddUser(user)
            dispatch(saveAuthDetail(data))
            navigate("/")
        } else {
            //  else telling that user already exist
            setValid(true)
        }
    }
    return (
        <>
            <div id="Authhome">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={phoneimage} alt="phone" />
                    <div>
                        <div id="login">
                            <img src={logo} alt="logo" />
                            <h4>Sign up to see photos and videos from your friends.</h4>
                            <form action="/">
                                {/* google signup button */}
                                <button onClick={SignUpWIthGoogle}>Signup With Google</button>
                                <h4>OR</h4>
                                {/* input fields */}
                                <input value={user?.username} onChange={(e) => saveUser("username", e.target.value)} placeholder="Username" />
                                <input value={user?.email} onChange={(e) => saveUser("email", e.target.value)} placeholder="Email" />
                                <input value={user?.password} onChange={(e) => saveUser("password", e.target.value)} placeholder="Password" />
                                <p>
                                    People who use our service may have uploaded your contact information to Instagram. Learn More</p><p>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .
                                </p>
                                {/* unless all the field are filled the button is disabled  */}
                                <button disabled={!(user?.username && user.email && user.password)} onClick={ManualSignUp}>Sign up</button>
                                {valid && <span>User Already Exist</span>}
                            </form>
                        </div>
                        <div id="route">
                            {/* to navigate to login page if user exist */}
                            <p>Have an account? <span onClick={() => navigate("/")}>Log in</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignUp
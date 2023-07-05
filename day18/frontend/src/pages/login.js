import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../component/icon";
import { useDispatch } from "react-redux";
import { saveAuth } from "../redux/slice/authSLice";
import { LoginService } from "../services/loginService";
const userNotFound = "USER NOT FOUND"
const wrongPassword = "INCORRECT PASSWORD"
const success = "SUCCESS"

const Login = () => {
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [show,setshow]=useState(success);
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const handleClick = async (e) => {
        e.preventDefault()
        const userData={ email: email, password: password }
        const data = await LoginService(userData)
        if ((data.data !== userNotFound) && (data.data !== wrongPassword)) {
            navigate("/");
            dispatch(saveAuth(userData))
            setshow(success)
        }else{
            setshow(data.data)
        }
    }
    return (
        <>
            <br />
            <div id="login" className="container">
                <div className="left child isactive">
                    <form style={{ padding: " 4vh 15%" }}>
                        <div id="head">
                            <h1>Sign In</h1>
                            <Icon />
                        </div>
                        <br />
                        <label className="label">EMAIL</label>
                        <br />
                        <input
                            type="email"
                            id="Username"
                            onChange={(e) => {
                                setemail(e.target.value);
                            }}
                            required
                            placeholder="Email"
                        />
                        <br />
                        <label for="Username" className="label">
                            PASSWORD
                        </label>
                        <br />
                        <input
                            type="password"
                            onChange={(e) => {
                                setpassword(e.target.value);
                            }}
                            required
                            placeholder="Password"
                        />
                        <br />
                        <br />
                        <button className="navbutton mainbutton" disabled={email && password ? "" : "disabled"} onClick={handleClick}>
                            Login
                        </button>
                        {(show !== success) && <span id="error">{show}</span>}
                        <br />
                        <input id="check" type="checkbox" name="check" />
                        <label className="colored" for="check">
                            Remember Me
                        </label>
                        <label id="fpassword">Forgot Password</label>
                    </form>
                </div>
                <div className="right child nonactive">
                    <div className="childitem">
                        <h1>WELCOME BACK!</h1>
                        <NavLink to="/" className="navi">
                            didn't have an account yet?
                            <br />
                            <br />
                            <button className="navbutton">SIGNUP</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;

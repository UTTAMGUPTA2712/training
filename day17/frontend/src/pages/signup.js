import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../component/icon";
import axios from "axios";
const userAlreadyExist = "USER ALREADY EXIST"
const success = "SUCCESS"

const Signup = () => {
    const [password, setpassword] = useState();
    const [form, setform] = useState({})
    const [show, setshow] = useState(success);
    const navigate = useNavigate();
    const savedata = (type, value) => {
        setform(p => ({ ...p, [type]: value }))
    }
    const handleClick = async (e) => {
        e.preventDefault();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            if (form.password !== password) {
                alert("Passwords do not match");
                return;
            }
            if (password.length < 4) {
                alert("Password must be at least 8 characters");
                return;
            }
            // saving unique user in server
            const data = await axios.post("http://localhost:1000/", form)
            if (data.data == userAlreadyExist) {
                setshow(userAlreadyExist);
            } else {
                navigate("/login");
                setshow(success);
            }
        } else {
            alert("Invalid Email");
        }
    }
    return (
        <>
            <br />
            <div className="container">
                <div className="right child isactive">
                    <form id="form">
                        <div id="head">
                            <h1>Sign Up</h1>
                            <Icon />
                        </div>
                        <label className="label">ENTER YOUR FULL NAME</label>
                        <br />
                        <input
                            type="text"
                            onChange={(e) => {
                                savedata("name", e.target.value);
                            }}
                            required
                            name="name"
                            placeholder="Full Name"
                        />
                        <br />
                        <label className="label">ENTER YOUR EMAIL</label>
                        <br />
                        <input
                            type="email"
                            onChange={(e) => {
                                savedata("email", e.target.value);
                            }}
                            required
                            name="email"
                            placeholder="Email"
                        />
                        <br />
                        <label className="label">ENTER YOUR PASSWORD</label>
                        <br />
                        <input
                            type="password"
                            onChange={(e) => {
                                savedata("password", e.target.value);
                            }}
                            required
                            name="password"
                            placeholder="Password"
                        />
                        <br />
                        <label className="label">CONFIRM PASSWORD</label>
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
                        <button className="navbutton mainbutton" disabled={(form.name && form.email && form.password && password) ? "" : "disabled"} onClick={handleClick}>
                            SignUp
                        </button>
                        {(show !== success) && <span id="error">{show}</span>}

                    </form>
                </div>
                <div className="left child nonactive">
                    <div className="childitem">
                        <h1>Lets Get To Know You</h1>
                        <NavLink to="/login" className="navi">
                            Have an account already
                            <br />
                            <br />
                            <button className="navbutton">LOGIN</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Signup;

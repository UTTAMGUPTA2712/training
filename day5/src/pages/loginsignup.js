import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../component/login";
import { Signup } from "../component/signup";
import  Homepage from "./homepage";
import  Profile from "./profile";
import image1 from "../assets/images/image1.jpg";
import Cart from "./cart";
export const LoginSignup = () => {
    return (
        <>
            <div id="container" style={{ backgroundImage: "url(" + image1 + ")" }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/homepage" element={<Homepage />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/*" element={<>NOT FOUND</>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
};

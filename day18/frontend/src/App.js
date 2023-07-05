import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import "./App.css"
import MainPage from "./pages/mainpage";
import { useSelector } from "react-redux";
const App = () => {
    const user=useSelector(state=>state.auth.userAuth)
    const privateRouter=[
        {
            path:"/*",
            component:<MainPage/>
        }
    ]
    const publicRouter=[
        {
            path:"/*",
            component:<Signup/>,
        },
        {
            path:"/login",
            component:<Login/>,
        }
    ]
    return (
        <>
            <Router>
            <Routes>
                {!user&&publicRouter.map((router)=>{return <Route path={router.path} element={router.component}/>})}
                {user&&privateRouter.map((router)=>{return <Route path={router.path} element={router.component}/>})}
            </Routes>
            </Router>
        </>
    );
};
export default App;
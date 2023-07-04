import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import HomePage from "./pages/homepage";
import "./App.css"
const App = () => {
    return (
        <>
            <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Signup />} />
                <Route path="/homepage" element={<HomePage />} />
            </Routes>
            </Router>
        </>
    );
};
export default App;
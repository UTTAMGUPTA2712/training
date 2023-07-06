import './App.css';
import { Login } from './pages/login';
import Signup from './pages/signup';
import Cart from './pages/cart';
import Homepage from './pages/homepage';
import Profile from './pages/profile';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import image1 from "./assets/images/image1.jpg";

function App() {
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
}

export default App;

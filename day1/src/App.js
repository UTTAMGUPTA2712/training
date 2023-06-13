import { useState } from "react";
import Mainpage from "./pages/mainpage";
import "./assets/styles/index.css";
const App = () => {
    const [query,setquery]=useState()
    return (
        <>
            <input id="search" type="text" onChange={(e)=>{setquery(e.target.value);}} placeholder="🔎 SEARCH...."/>
            <Mainpage query={query}/>
        </>
    );
};
export default App;

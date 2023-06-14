import { useState } from "react";
import Search from "./search";

const PlayList = ({setSearch}) => {
    
    const debounce = (setSearch, wait = 800) => {
        let timeout;
        return (...args)=> {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                clearTimeout(timeout);
                setSearch(...args);
            }, wait);
        };
    };
    const work=debounce((e)=>{setSearch(e.target.value)});
    return (
        <>
            <div id="playlist">
            <input onChange={work}type="text" placeholder="SEARCH.............................."/>
            </div>
            
        </>
    );
};
export default PlayList;


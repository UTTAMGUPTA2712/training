import React, { useState } from "react";
import PlayList from "../component/playlist";
import ListItem from "../component/listItem";
import SideCard from "../component/sideCard";
import data from "../assets/data/musicdata.json"
const MainPage = () => {
    const [search, setSearch] = useState();
    const [musicList,setMusicList]=useState(data)
    const [playingSong,setPlayingSong]=useState([musicList[0],0])

    const changePlayingSong=(index)=>{
        setPlayingSong([musicList[index],index])
    }
    return (
        <>
            <div id="mainpage">
                <div>
                <PlayList setSearch={setSearch}/>
                <ListItem musicList={musicList} search={search} playingSong={playingSong} changePlayingSong={changePlayingSong}/>
                </div>
                <SideCard playingSong={playingSong} changePlayingSong={changePlayingSong}/>
            </div>
        </>
    );
};
export default MainPage;

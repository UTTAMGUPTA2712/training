import pauselogo from "../assets/image/pause.png";
import forwardlogo from "../assets/image/forward.png";
import backwardlogo from "../assets/image/backward.png";
import playlogo from "../assets/image/play.png";
import shuffle from "../assets/image/shuffle.png"
import { useEffect, useRef, useState } from "react";
const SideCard = ({ playingSong, changePlayingSong }) => {
    const [logo, setlogo] = useState(playlogo);
    const audioRef = useRef(new Audio(playingSong[0].musicurl));
    useEffect(() => {
        let newaudio = new Audio(playingSong[0].musicurl);
        if (audioRef.current !== newaudio) {
            audioRef.current.pause();
            audioRef.current = newaudio;
            console.log(audioRef.current,newaudio);
            if(logo==pauselogo){
            audioRef.current.play();}
        }
    }, [playingSong]);
    const handleimageclick = () => {
        setlogo(
            logo == playlogo
                ? () => {
                      audioRef.current.play();
                      return pauselogo;
                  }
                : () => {
                      audioRef.current.pause();
                      return playlogo;
                  }
        );
    };
    function getRandomArbitrary(min=0, max=19) {
        return Math.random() * (max - min) + min;
    }
    return (
        <>
            <div id="sidecard">
                <div id="musiccard" style={{backgroundImage:"url("+playingSong[0].logo_url+")"}}>
                    <div id="image"/>
                    <div id="carddiv">
                    <div id="titlediv">
                    <h1>{playingSong[0].title}</h1>
                    <h3>{playingSong[0].name}</h3>
                    <button id="shuffle" onClick={()=>{setlogo(pauselogo    );changePlayingSong(Math.floor(getRandomArbitrary()))}}><img src={shuffle}/></button>
                    </div>
                    <br />
                    <div className="buttonset">
                        <button onClick={() => {changePlayingSong(playingSong[1] == 0 ? 19 : (playingSong[1] - 1) % 20);}}>
                            <img src={backwardlogo} />
                        </button>
                        <button>
                            <img style={{ height: "70px", width: "70px" }} onClick={handleimageclick} src={logo} />
                        </button>
                        <button onClick={() => {changePlayingSong((playingSong[1] + 1) % 20);console.log(playingSong[1])}}>
                            <img src={forwardlogo} />
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SideCard;

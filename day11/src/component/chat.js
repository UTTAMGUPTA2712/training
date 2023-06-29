import { useEffect, useRef, useState } from "react";
import ChatsCard from "./chatsCard"
import micicon from "../assets/images/mic.png"
import sendicon from "../assets/images/send.png"
import phoneicon from "../assets/images/phone.png"
import avataricon from "../assets/images/avatar.png"
import { arrayUnion, collection, doc, getDocs, onSnapshot, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../pages/firbaseApp";
import InputEmoji from "react-input-emoji";
import reseticon from "../assets/images/reset.png"
import { all } from "q";
import wallpaper from "../assets/images/wall3.png"
import { ResetChats } from "../utils/resetchats";
const Chats = () => {
    const [typetext, settypetext] = useState("")
    const [chats, setChats] = useState([])
    const [ChatRoomuserId, setChatRoomuserId] = useState("")
    let date;
    const currentuser = useSelector((state) => state.auth.userAuth)
    const curentChatRoomId = useSelector((state) => state.auth.chatroomid)
    const roomid = useRef("")
    const seconduser = useSelector((state) => state.auth.curchatroom)
    console.log("roomid", roomid)
    useEffect(() => {
        if (curentChatRoomId != null) {
            try {
                const getid = async () => {
                    const chat = await getDocs(collection(db, "chatRooms"));
                    const neededChat = chat.docs.filter((chatroom) => (chatroom.data().chatRoomId === curentChatRoomId))
                    if (neededChat[0]?.id != null) {
                        setChatRoomuserId(neededChat[0]?.id)
                    }
                }
                const getchat = async () => {
                    try {
                        const chat = await getDocs(collection(db, "chatRooms"));
                        const neededChat = chat.docs.filter((chatroom) => (chatroom.data().chatRoomId === curentChatRoomId))
                        if (neededChat?.[0]) {
                            const q = query(doc(db, "chatRooms", neededChat?.[0].id))
                            const unsubscribe = onSnapshot(q, (snapshot) => {
                                const message = snapshot.data().messages
                                setChats(message)
                                if(curentChatRoomId){
                                    roomid.current=curentChatRoomId
                                }
                            })
                            return () => unsubscribe()
                        } {
                            setChats([])
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
                getid()
                getchat()
            } catch (err) {
                console.log("", err)
            }
        }
    }, [curentChatRoomId, typetext])
    useEffect(() => {
        const target = document.querySelector("#chatboxcontainer");
        target.scroll({ top: target.scrollHeight, behavior: "smooth" })
    },[typetext,roomid.current])

    const sendmessage = async () => {
        if (typetext.trim() != "") {
            try {
                const messageChat = typetext
                const time = new Date()
                settypetext("")
                const sendingdata = { chat: messageChat, time: time.toLocaleTimeString(), date: time.toLocaleDateString(), sender: currentuser.userId }
                await updateDoc(doc(db, "chatRooms", ChatRoomuserId), {
                    messages: arrayUnion(sendingdata),
                    lastchat:messageChat,
                })
            }
            catch (err) {
                console.log("", err)
            }
        }
    }

    const typing = async (e) => {
        try {
            settypetext(e);
            console.log("nowchat", roomid.current)
            await updateDoc(doc(db, "users", currentuser?.id), {
                chatroom: { [roomid.current]: true }
            })
            let clear;
            clearTimeout(clear)
            clear = setTimeout(async () => {
                await updateDoc(doc(db, "users", currentuser?.id), {
                    chatroom: { [roomid.current]: false }
                })
            }, 1000);
        } catch (err) { console.log(err) }
    };

    return (<>
        <div id="userdetail"><img className="avatar" src={(curentChatRoomId == null) ? avataricon : seconduser?.photo} /><h2>{(curentChatRoomId == null) ? "UserName" : seconduser?.name}</h2><span><img src={phoneicon} /><img onClick={()=>ResetChats(curentChatRoomId)} src={reseticon} /></span></div>
        <div id="chatboxcontainer" style={{ backgroundImage: (curentChatRoomId == null) && ("url(" + wallpaper + ")"), backgroundPosition: "center", backgroundSize: "cover" }}>{console.log("wallpaer", curentChatRoomId)}
            <div id="chatbox">
                {(curentChatRoomId == null) ? "" : chats?.map((chat) => {
                    const today=(new Date()).getDate();
                    const gotDate=(new Date(chat?.date)).getDate();
                    const ans=(date != (date=chat?.date)) ? (<span className="chatdate">{((today-gotDate)==0)?"Today":(((today-gotDate)==1))?"Yesterday":(date)}</span>) : ""
                    return <>
                        {ans}
                        <ChatsCard data={chat} user={currentuser.userId} /></>
                })}
            </div>
        </div>
        <div id="typechat">
            <InputEmoji
                value={typetext}
                onChange={(e) => typing(e)}
                cleanOnEnter
                onEnter={sendmessage}
                placeholder="Type a message" />
            <img src={sendicon} onClick={sendmessage} />
            <img src={micicon} />
        </div>
    </>)
}
export default Chats
import { useEffect, useState } from "react";
import ChatsCard from "./chatsCard"
import micicon from "../assets/images/mic.png"
import sendicon from "../assets/images/send.png"
import phoneicon from "../assets/images/phone.png"
import avataricon from "../assets/images/avatar.png"
import { arrayUnion, collection, doc, getDocs, onSnapshot, query, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../pages/firbaseApp";
import InputEmoji from "react-input-emoji";
import reseticon from "../assets/images/reset.png"
import { all } from "q";
import wallpaper from "../assets/images/wall3.png"
const Chats = () => {
    const [typetext, settypetext] = useState("")
    const [chats, setChats] = useState([])
    const [ChatRoomuserId, setChatRoomuserId] = useState("")
    let date;
    const currentuser = useSelector((state) => state.auth.userAuth)
    const curentChatRoomId = useSelector((state) => state.auth.chatroomid)
    const seconduser = useSelector((state) => state.auth.curchatroom)
    useEffect(() => {
        if (curentChatRoomId != null) {
            try {
                const getid = async () => {
                    const chat = await getDocs(collection(db, "chatRooms"));
                    const neededChat = chat.docs.filter((chatroom) => (chatroom.data().chatRoomId === curentChatRoomId))
                    if(neededChat[0]?.id){
                    setChatRoomuserId(neededChat[0]?.id)}
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
                            })
                            const target = document.querySelector("#chatboxcontainer");
                            target.scroll({ top: target.scrollHeight, behavior: "smooth" })
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

    const sendmessage = async () => {
        if (typetext.trim() != "") {
            try {
                const messageChat = typetext
                const time = new Date()
                settypetext("")
                const sendingdata = { chat: messageChat, time: time.toLocaleTimeString(), date: time.toLocaleDateString(), sender: currentuser.userId }
                await updateDoc(doc(db, "chatRooms", ChatRoomuserId), {
                    messages: arrayUnion(sendingdata)
                })
            }
            catch (err) {
                console.log("", err)
            }
        }
    }
    // console.log("", curentChatRoomId)
    const typing = async (e) => {
        try{
        settypetext(e);
        console.log("nowchat", curentChatRoomId)
        await updateDoc(doc(db, "users", currentuser?.id), {
            chatroom: { [curentChatRoomId]: true }
        })
        let clear;
        clearTimeout(clear)
        clear = setTimeout(async () => {
            await updateDoc(doc(db, "users", currentuser?.id), {
                chatroom: { [curentChatRoomId]: false }
            })
        }, 5000);
    }catch(err){console.log(err)}
    };
    const handlereset=async()=>{
        const allchatrooms=await getDocs(collection(db, "chatRooms"))
        const neededChat=allchatrooms.docs.filter(chat=>chat.data().chatRoomId==curentChatRoomId)
        const done=await updateDoc(doc(db, "chatRooms",neededChat?.[0].id), {
            messages:[]
        })
        console.log(done)
    }
    return (<>
        <div id="userdetail"><img className="avatar" src={(curentChatRoomId==null)?avataricon:seconduser?.photo} /><h2>{(curentChatRoomId==null)?"UserName":seconduser?.name}</h2><span><img src={phoneicon} /><img onClick={handlereset} src={reseticon} /></span></div>
        <div id="chatboxcontainer" style={{backgroundImage:(curentChatRoomId==null)&&("url("+wallpaper+")"),backgroundPosition:"center",backgroundSize:"cover"}}>{console.log("wallpaer",curentChatRoomId)}
            <div id="chatbox">
                {(curentChatRoomId==null)?"":chats?.map((chat) => {
                    
                    return <>
                    
                        {(date != (chat?.date)) ? (<span className="chatdate">{date = chat?.date}</span>) : ""}
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
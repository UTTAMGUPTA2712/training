import { useEffect, useState } from "react";
import ChatsCard from "./chatsCard"
import smileicon from "../assets/images/smile.png"
import micicon from "../assets/images/mic.png"
import searchicon from "../assets/images/search.png"
import phoneicon from "../assets/images/phone.png"
import avataricon from "../assets/images/avatar.png"
import { arrayUnion, collection, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../pages/firbaseApp";
const Chats = ({ data }) => {
    const [typetext, settypetext] = useState("")
    const [chats, setChats] = useState([])
    // const [message, setmessage] = useState("")
    const [ChatRoomuserId, setChatRoomuserId] = useState("")
    const user = "uttam"

    const chatdata = []
    let date;
    const currentuser = useSelector((state) => state.auth.userAuth.userId)
    const curentChatRoomId = useSelector((state) => state.auth.chatroomid)
    console.log("", curentChatRoomId, currentuser)
    useEffect(() => {
        if (curentChatRoomId!=null) {
            try {
                const getid = async () => {
                    const chat = await getDocs(collection(db, "chatRooms"));
                    const neededChat = chat.docs.filter((chatroom) => (chatroom.data().chatRoomId === curentChatRoomId))
                    //console.log("", neededChat[0].id)
                    setChatRoomuserId(neededChat[0]?.id)
                }
                const getchat = async () => {
                    const chat = await getDocs(collection(db, "chatRooms"));
                    const neededChat = chat.docs.filter((chatroom) => (chatroom.data().chatRoomId === curentChatRoomId))
                    //console.log("", neededChat[0].id)
                    const q = doc(db, "chatRooms", neededChat[0]?.id)
                    const unsubscribe = onSnapshot(q, (snapshot) => {
                        const message = snapshot.data().messages
                        setChats(message)
                        //console.log("chats", chats)
                    })
                    const target = document.querySelector("#chatboxcontainer");
                    target.scroll({ top: target.scrollHeight, behavior: "smooth" })
                    return () => unsubscribe()
                }
                getid()
                getchat()
            } catch (err) {
                //console.log("", err)
            }
        }
    }, [curentChatRoomId, typetext])

    const sendmessage = async () => {
        if (typetext) {
            try {
                const messageChat = typetext
                const time = new Date()
                settypetext("")
                //console.log("lplplplplp", messageChat);
                const sendingdata = { chat: messageChat, time: time.toLocaleTimeString(), date: time.toLocaleDateString(), sender: currentuser }
                //console.log(".,.,.,", sendingdata)
                await updateDoc(doc(db, "chatRooms", ChatRoomuserId), {
                    messages: arrayUnion(sendingdata)
                })
            }
            catch (err) {
                //console.log("", err)
            }
        }
    }
    return (<>
        <div id="userdetail"><img className="avatar" src={avataricon} /><h2>UserName</h2><span><img src={phoneicon} /><img src={searchicon} /></span></div>
        <div id="chatboxcontainer">
            <div id="chatbox">
                {chats?.map((chat) => {
                    return <>
                        {(date != (chat?.date)) ? (<span className="chatdate">{date = chat?.date}</span>) : ""}
                        <ChatsCard data={chat} user={currentuser} /></>
                })}
            </div>
        </div>
        <div id="typechat"><img src={smileicon} /><input onChange={(e) => settypetext(e.target.value)} value={typetext} type="textarea" placeholder="Type a message" /><button onClick={sendmessage}>SEND</button><img src={micicon} /></div>
    </>)
}
export default Chats
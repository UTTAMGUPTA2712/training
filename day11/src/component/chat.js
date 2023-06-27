import { useEffect, useState } from "react";
import ChatsCard from "./chatsCard"
import smileicon from "../assets/images/smile.png"
import micicon from "../assets/images/mic.png"
import searchicon from "../assets/images/search.png"
import phoneicon from "../assets/images/phone.png"
import avataricon from "../assets/images/avatar.png"
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../pages/firbaseApp";
const Chats = ({ data }) => {
    const user = "uttam"

    const chatdata = []
    const [chats, setChats] = useState([])
    let date;
    const currentuser = useSelector((state) => state.auth.userAuth.userId)
    const curentChatRoomId = useSelector((state) => state.auth.chatroomid)
    console.log("", curentChatRoomId, currentuser)
    useEffect(() => {
        if (curentChatRoomId) {

            const getchat = async () => {
                const chat = await getDocs(collection(db, "chatRooms"));
                const neededData = chat.docs.filter(chatRooms => (chatRooms.data().chatRoomId === curentChatRoomId));
                console.log(neededData[0])
                setChats(neededData[0].data().messages)
            }
            getchat()
            const target = document.querySelector("#chatbox");
            target.scroll({ top: target.scrollHeight, behavior: "smooth" })
        }
    }, [curentChatRoomId])
    //     useEffect(() => {

    //     }, [])
    console.log("----------------------", chats)

    const [message, setmessage] = useState()

    const sendmessage = async () => {
        // setmessage()
        const chat = await getDocs(collection(db, "chatRooms"));
        const neededChat = chat.docs.filter((chatroom) => (chatroom.data().chatRoomId === curentChatRoomId))
        console.log("", neededChat[0].id)
        const time = new Date()
        // const query=query(
        //     doc(db, "chatRooms", neededChat[0].id),
        //     orderBy("time"),
        //     limit(50)
        // )
        // const unsubscribe=onSnapshot(query, (q)=>{
        //     let messages=[]
        //     q.forEach(element => {
        //         messages.push([...element,{ chat: message, time: time.toLocaleTimeString(),date:time.toLocaleDateString(), sender: currentuser }])   
        //     });
        // })
        // return ()=>unsubscribe()
        // console.log("", time)
        await setDoc(doc(db, "chatRooms", neededChat[0].id), { messages: [...(neededChat[0].data().messages),{ chat: message, time: time.toLocaleTimeString(),date:time.toLocaleDateString(), sender: currentuser }] })
        setmessage("")
    }
    return (<>
        <div id="userdetail"><img className="avatar" src={avataricon} /><h2 style={{ alignSelf: "" }}>UserName</h2><span><img src={phoneicon} /><img src={searchicon} /></span></div>
        <div id="chatboxcontainer">
            <div id="chatbox">
                {chats.map((chat) => {
                    return <>
                    {(date != (chat?.date)) ? (<span className="chatdate">{date = chat?.date}</span>) : ""}
                    <ChatsCard data={chat} user={user} /></>
                })}
            </div>
        </div>
        <div id="typechat"><img src={smileicon} /><input onChange={(e) => setmessage(e.target.value)} value={message} type="textarea" placeholder="Type a message" /><button onClick={sendmessage}>SEND</button><img src={micicon} /></div>
    </>)
}
export default Chats
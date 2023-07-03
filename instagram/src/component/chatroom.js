import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../utils/firebase'
import { ReloadOutlined } from "@ant-design/icons"
import ChatCard from './chatCard'
import { useNavigate } from 'react-router-dom'
// the chatroom containing all the chats of a given chatrrom
const ChatRoom = () => {
    // initializeing dependency
    const currentChatRoom = useSelector(state => state.auth.currentChatRoom)
    const [chatRoomData, setChatRoomData] = useState(null)
    const secondUser = useSelector(state => state.auth.secondUser)
    const currentUser = useSelector(state => state.auth.authDetail)
    const navigate = useNavigate()
    useEffect(() => {
        // realtime update of chatrrom messages
        if (currentChatRoom) {
            const getmessage = onSnapshot(doc(db, "ChatRooms", currentChatRoom), (snapshot) => {
                setChatRoomData(snapshot?.data())
            })
            return () => getmessage()
        }
    }, [currentChatRoom])
    // to handle date of chatrrom messages
    let date
    // to check the user profile
    const handleUserDetail = () => {
        navigate("/userDetail", { state: secondUser })
    }
    // to clean the messages
    const handleclear=async ()=>{
        await updateDoc(doc(db,"ChatRooms",currentChatRoom),{
            messages:[],
            latest:""
        })
    }
    return (
        <>
            <div id='chatDetail'>
                {/* second user detail */}
                <img src={secondUser?.photo} alt='second user pic' />
                <h2 onClick={handleUserDetail} className='pointer'>
                    {secondUser?.username}
                </h2>
                {/* clean chat button */}
                <ReloadOutlined onClick={handleclear}/>
            </div>
            {/* if chatrrom is selected the chatroom is shown or else not */}
            <div id='chatmessage'>
                {(currentChatRoom == null) ? "" : (chatRoomData?.messages ?? []).map((chat) => {
                    // handling the date of the messages
                    const today = (new Date()).getDate();
                    const gotDate = (new Date(chat?.date)).getDate();
                    const ans = (date !== (date = chat?.date)) ? (<span className="chatdate">{((today - gotDate) === 0) ? "Today" : (((today - gotDate) === 1)) ? "Yesterday" : (date)}</span>) : ""
                    return <>
                        {ans}
                        <ChatCard data={chat} user={currentUser?.userId} /></>
                })}
            </div>
        </>
    )
}

export default ChatRoom
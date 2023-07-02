import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../utils/firebase'
import { ReloadOutlined } from "@ant-design/icons"
import ChatCard from './chatCard'
import { useNavigate } from 'react-router-dom'
const ChatRoom = () => {
    const currentChatRoom = useSelector(state => state.auth.currentChatRoom)
    const [chatRoomData, setChatRoomData] = useState(null)
    const secondUser = useSelector(state => state.auth.secondUser)
    const currentUser = useSelector(state => state.auth.authDetail)
    const navigate = useNavigate()
    useEffect(() => {
        if (currentChatRoom) {
            const getmessage = onSnapshot(doc(db, "ChatRooms", currentChatRoom), (snapshot) => {
                setChatRoomData(snapshot?.data())
            })
            return () => getmessage()
        }
    }, [currentChatRoom])
    let date
    const handleUserDetail = () => {
        navigate("/userDetail", { state: secondUser })
    }
    const handleclear=async ()=>{
        await updateDoc(doc(db,"ChatRooms",currentChatRoom),{
            messages:[],
            latest:""
        })
    }
    return (
        <>
            <div id='chatDetail'>
                <img src={secondUser?.photo} alt='second user pic' />
                <h2 onClick={handleUserDetail} className='pointer'>
                    {secondUser?.username}
                </h2>
                <ReloadOutlined onClick={handleclear}/>
            </div>
            <div id='chatmessage'>
                {(currentChatRoom == null) ? "" : (chatRoomData?.messages ?? []).map((chat) => {
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
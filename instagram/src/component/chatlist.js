import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../utils/firebase'
import ChatListCard from './chatListCard'

const ChatList = () => {
    const [chatRoomList, setChatRoomList] = useState([])
    const currentUser = useSelector(state => state.auth.authDetail?.userId)
    useEffect(() => {
        const q=query(
            collection(db, "ChatRooms"),
            orderBy("lastUpdate","desc")
        )
        const getChats = onSnapshot(q, (snapshot) => {
            const gotChats = snapshot.docs.filter(chat => (chat.data().user1 === currentUser) || (chat.data().user2 === currentUser))
            const neededData=gotChats?.map(chat =>{return chat?.data()})
            setChatRoomList(neededData)
        })
        return () => getChats()
    }, [])
    console.log("",chatRoomList)
    return (
        <>
        <div id='chatList'>
            {(chatRoomList??[]).map(chatRoom => {
                const secondUser = (chatRoom.user1 === currentUser) ? (chatRoom.user2) : (chatRoom.user1)
                return <ChatListCard data={secondUser} chatroom={chatRoom} />
            })}
            </div>
        </>
    )
}

export default ChatList
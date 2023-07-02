import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { saveCurrentChatRoom, saveSecondUser } from '../reducer/authslice'

const ChatListCard = ({ data, chatroom }) => {
    const [userDetail, setUserDetail] = useState([])
    const dispatch=useDispatch()
    useEffect(() => {
        const getUser = onSnapshot(doc(db, "Users", data), (snapshot) => {
            setUserDetail(snapshot?.data())
        })
        return ()=>getUser()
    }, [data])
    const handleClick=()=>{
        dispatch(saveCurrentChatRoom(chatroom.chatRoomId))
        dispatch(saveSecondUser(userDetail))
    }
    return (
        <>
            <div id='chatlistCard' onClick={handleClick}>
                <img className={userDetail.online?"online":"offline"} src={userDetail.photo} alt='user'/>
                <div>
                    <h2>{userDetail.username}</h2>
                    <p>{(userDetail.typing?.[chatroom.chatRoomId]) ? "Typing..." : (chatroom.latest)}</p>
                </div>
            </div>
        </>
    )
}

export default ChatListCard
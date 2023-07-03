import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { saveCurrentChatRoom, saveSecondUser } from '../reducer/authslice'
// show the chat room hwose datat is given
const ChatListCard = ({ data, chatroom }) => {
    // initialize the detail of second user in chatroom
    const [userDetail, setUserDetail] = useState([])
    const dispatch=useDispatch()
    useEffect(() => {
        // getting realtime data of the second user in chatroom
        const getUser = onSnapshot(doc(db, "Users", data), (snapshot) => {
            setUserDetail(snapshot?.data())
        })
        return ()=>getUser()
    }, [data])
    // changing the chatroomid in store
    const handleClick=()=>{
        dispatch(saveCurrentChatRoom(chatroom.chatRoomId))
        dispatch(saveSecondUser(userDetail))
    }
    return (
        <>
        {/* change chatroom on click */}
            <div id='chatlistCard' onClick={handleClick}>
                <img className={userDetail.online?"online":"offline"} src={userDetail.photo} alt='user'/>
                <div>
                    {/* showing second user detail */}
                    <h2>{userDetail.username}</h2>
                    <p>{(userDetail.typing?.[chatroom.chatRoomId]) ? "Typing..." : (chatroom.latest)}</p>
                </div>
            </div>
        </>
    )
}

export default ChatListCard
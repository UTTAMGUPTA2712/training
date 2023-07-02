import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase'
// import { logDOM } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
import { saveCurrentChatRoom, saveSecondUser } from '../reducer/authslice'

const UserList = () => {
    const [userList, setUserList] = useState([])
    const [choice, setChoice] = useState(null)
    const currentuser = useSelector(state => state.auth.authDetail?.userId)
    const dispatch = useDispatch()
    useEffect(() => {
        const getuser = onSnapshot(collection(db, "Users"), (snapshot) => {
            const gotuser = snapshot?.docs.map((user => user.data()))
            setUserList(gotuser)
        })
        return () => getuser()
    }, [])
    const handleChat = async () => {
        const roomId = (currentuser < choice) ? (currentuser + choice) : (choice + currentuser)
        const duplicate = await getDoc(doc(db, "ChatRoom", roomId))
        console.log("", duplicate.exists,duplicate)
        if (!(duplicate.exists())) {
            await setDoc(doc(db, "ChatRooms", roomId), {
                chatRoomId: roomId,
                user1: currentuser,
                user2: choice,
                lastUpdate:new Date(),
                chat: []
            })
        }
        dispatch(saveCurrentChatRoom(roomId))
        dispatch(saveSecondUser(userList.filter((user)=>user.userId===choice)[0]))
    }
    return (
        <>
            <div id='userList'>
                <select onChange={(e) => {setChoice(e.target.value) }} id="userlist">
                    {userList?.map((user) => { return <option value={user.userId}>{user.username}</option> })}
                </select>
                <button disabled={!choice} onClick={handleChat}>Start Chat</button>
                <div>MESSAGES</div>
            </div>
        </>
    )
}
export default UserList
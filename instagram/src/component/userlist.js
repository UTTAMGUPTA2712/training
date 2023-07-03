import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { saveCurrentChatRoom, saveSecondUser } from '../reducer/authslice'
import { handleChat } from '../utils/handleChatRoom.js'

const UserList = () => {
    // iniliatizing userlist and the choice of logged user
    const [userList, setUserList] = useState([])
    const [choice, setChoice] = useState(null)
    // getting data of logged user 
    const currentuser = useSelector(state => state.auth.authDetail?.userId)
    const dispatch = useDispatch()
    useEffect(() => {
        // to get realtime list of all existing user and setting it up in userlist
        const getuser = onSnapshot(collection(db, "Users"), (snapshot) => {
            const gotuser = snapshot?.docs.map((user => user.data()))
            // filter out the logged user
            const neededdata = gotuser.filter(user => user.userId !== currentuser)
            setUserList(neededdata)
        })
        return () => getuser()
    }, [])
    const handleChatRoom = async () => {
        // getting the data after the createing of room id 
        const data = await handleChat(currentuser, choice, userList)
        //  dispatching the chatroom id and the user in that chatroom
        dispatch(saveCurrentChatRoom(data))
        dispatch(saveSecondUser(userList.filter((user) => user.userId === choice)[0]))
    }
    return (
        <>
            <div id='userList'>
                {/* list of choice of users someone can talk to */}
                <select onChange={(e) => { setChoice(e.target.value) }} id="userlist">
                    <option value="">Select User</option>
                    {userList?.map((user) => { return <option value={user.userId}>{user.username}</option> })}
                </select>
                {/* set the chatrrom once the user has been choosen with onlick */}
                <button disabled={!choice} onClick={handleChatRoom}>Start Chat</button>
                <div>MESSAGES</div>
            </div>
        </>
    )
}
export default UserList
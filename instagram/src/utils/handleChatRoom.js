import { doc, getDoc, setDoc } from "firebase/firestore"
// import { useDispatch } from "react-redux"
import { db } from "./firebase"

// setting up chat room using the currentuser and it choice of user he want to talk to in user list
export const handleChat = async (currentuser, choice, userList) => {
    // getting roomId by comparing their ids
    const roomId = (currentuser < choice) ? (currentuser + choice) : (choice + currentuser)
    // checking if there already exist a chatroom with same id
    const duplicate = await getDoc(doc(db, "ChatRoom", roomId))
    if (!(duplicate.exists())) {
        // if doesnot exist them create one chatroom
        await setDoc(doc(db, "ChatRooms", roomId), {
            chatRoomId: roomId,
            user1: currentuser,
            user2: choice,
            lastUpdate: new Date(),
            chat: []
        })
    }
    // returning the roomid
    return roomId
}
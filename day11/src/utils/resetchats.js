import { collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../pages/firbaseApp"

export const ResetChats=(curentChatRoomId)=>{
    const handlereset = async () => {
        const allchatrooms = await getDocs(collection(db, "chatRooms"))
        const neededChat = allchatrooms.docs.filter(chat => chat.data().chatRoomId == curentChatRoomId)
        const done = await updateDoc(doc(db, "chatRooms", neededChat?.[0].id), {
            messages: []
        })
        console.log(done)
    }
    return handlereset()
}
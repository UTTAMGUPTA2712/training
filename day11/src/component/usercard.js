import { doc, getDoc, onSnapshot } from "firebase/firestore"
import avataricon from "../assets/images/avatar.png"
import { db } from "../pages/firbaseApp"
import { useEffect, useState } from "react"
const UserCard = ({ data,curentChatRoomId }) => {
    const [statusnow, setstatus] = useState(false);
    const [typing,settyping]=useState(false);
    useEffect(() => {
        try {
            const getstatus = onSnapshot(doc(db, "users", data?.id), (snapshot) => {
                setstatus(snapshot.data().online)
                console.log("snapshot",snapshot.data().chatroom?.[curentChatRoomId])
                settyping(snapshot.data().chatroom?.[curentChatRoomId])
            })
            return () => getstatus()
        }
        catch (err) { console.log(err) }
    }, [])
    return (<>
        <div id="usercard"><img className={(statusnow) ? "online" : "offline"} src={data?.photo ?? avataricon} /><div><h1>{data?.name ?? "name"}</h1><h2>{(typing==true)?"typing...":""}</h2></div></div>
    </>)
}
export default UserCard
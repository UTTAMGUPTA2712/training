import { useDispatch, useSelector } from "react-redux"
import UserCard from "./usercard"
import Search from "./search"
import editicon from "../assets/images/edit.png"
import dotsicon from "../assets/images/dotsicon.png"
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "../pages/firbaseApp"
import { useEffect, useState } from "react"
import { setchatroomid, setcurchatuser } from "../redux/reducer/authSlice"
const UserList = () => {
    const [userdata, setuserdata] = useState([])
    const curentChatRoomId = useSelector((state) => state.auth.chatroomid)
    useEffect(() => {
        try {
            const unsubscribe = onSnapshot(collection(db, "chatRooms"), (snapshot) => {
                setuserdata(snapshot.docs)
            })
            return () => unsubscribe()
        }
        catch (err) { console.log(err) }
    }, [])
    const dispatch = useDispatch()
    const allusers = useSelector((state) => state.auth.allusers)
    const currentuser = useSelector((state) => state.auth.userAuth.userId)
    return (<>
        <div id="userlisttop"><div><h1 style={{ fontSize: "3em", margin: "0.5em 0", fontWeight: "400" }}>Chats</h1>
            <span><img src={editicon} /><img src={dotsicon} /></span>
        </div>
            <Search /></div>
        <div id="userlist">
            {userdata.map((user) => {
                const sender = user.data().sender;
                const receiver = user.data().receiver;
                const thisuserdata = (receiver.userId == currentuser) ? (sender) : ((sender.userId == currentuser) ? receiver : "no");
                // const secuserdata = (receiver.userId == currentuser) ? (sender) : ((sender.userId == currentuser) ? receiver : "no");
                if (thisuserdata != "no") {
                    return <><div onClick={() => {dispatch(setchatroomid(user.data().chatRoomId));dispatch(setcurchatuser(thisuserdata));console.log("confirm",user.data().chatRoomId)}}><UserCard data={thisuserdata} curentChatRoomId={curentChatRoomId} /></div></>
                }
            })}
        </div>
    </>)
}
export default UserList
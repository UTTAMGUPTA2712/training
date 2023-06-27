import { useDispatch, useSelector } from "react-redux"
import UserCard from "./usercard"
import Search from "./search"
import editicon from "../assets/images/edit.png"
import dotsicon from "../assets/images/dotsicon.png"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../pages/firbaseApp"
import { useEffect, useState } from "react"
import { setchatroomid } from "../redux/reducer/authSlice"
const UserList = () => {
    const usedata = useSelector((state) => state.userdata?.userList) || [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    const [userdata,setuserdata]=useState([])
    useEffect(()=>{
    const getusers=async()=>{
        const user=await getDocs(collection(db,"chatRooms"))
        setuserdata(user.docs)}
    getusers()
    },[])
    const dispatch=useDispatch()
    return (<>
        <div id="userlisttop"><div><h1 style={{ fontSize: "3em", margin: "0.5em 0", fontWeight: "400" }}>Chats</h1>
            <span><img src={editicon} /><img src={dotsicon} /></span>
        </div>
            <Search /></div>
        <div id="userlist">
            {userdata.map((user) => {
                console.log(user)
                return <><div onClick={()=>dispatch(setchatroomid(user.chatRoomId))}><UserCard data={user} /></div></>
            })}
        </div>
    </>)
}
export default UserList
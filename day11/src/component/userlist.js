import { useSelector } from "react-redux"
import UserCard from "./usercard"
import Search from "./search"
import editicon from "../assets/images/edit.png"
import dotsicon from "../assets/images/dotsicon.png"
const UserList = () => {
    const userdata = useSelector((state) => state.userdata?.userList) || [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    return (<>
        <div id="userlisttop"><div><h1 style={{ fontSize: "3em", margin: "0.5em 0", fontWeight: "400" }}>Chats</h1>
            <span><img src={editicon} /><img src={dotsicon} /></span>
        </div>
            <Search /></div>
        <div id="userlist">
            {userdata.map((user) => {
                return <><UserCard data={user} /></>
            })}
        </div>
    </>)
}
export default UserList
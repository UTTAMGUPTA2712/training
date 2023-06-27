import { useDispatch } from "react-redux"
import avataricon from "../assets/images/avatar.png"
import messageicon from "../assets/images/message.png"
import { logout } from "../redux/reducer/authSlice"

const SideBar=()=>{
    const dispatch=useDispatch()
    return (<>
    <div id="side">
    <img style={{height:"2em",width:"2em"}} src={messageicon} />
    <img onClick={()=>dispatch(logout())} src={avataricon} />
    </div>
    </>)
}
export default SideBar
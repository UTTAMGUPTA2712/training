import avataricon from "../assets/images/avatar.png"
import messageicon from "../assets/images/message.png"

const SideBar=()=>{
    return (<>
    <div id="side">
    <img src={messageicon} />
    <img src={avataricon} />
    </div>
    </>)
}
export default SideBar
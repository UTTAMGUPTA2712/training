import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/reducer/authSlice"
import Search from "../component/search"
import UserList from "../component/userlist"
import whatsappicon from "../assets/images/whatsapp.png"
import Chats from "../component/chat"
import SideBar from "../component/sidebar"

const HomePage = () => {
    return (<>
        <div id="homepage">
            <div className="borderbars"><img src={whatsappicon} /></div>
            <div className="borderbars"><h2>WhatsApp</h2></div>
            <div className="borderbars"></div>
            <div id="sidebar" className="borderbars"><SideBar /></div>
            <div id="users" className="contentdiv"><UserList /></div>
            <div id="chat" className="contentdiv"><Chats /></div>
        </div>
    </>)
}
export default HomePage
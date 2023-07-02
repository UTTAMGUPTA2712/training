import homeicon from "../assets/images/home.png"
import chaticon from "../assets/images/chats.png"
import noticon from "../assets/images/notification.png"
import logo from "../assets/images/logoblack.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import logouticon from "../assets/images/logout.png"
import { cleanChatRoom, logout } from "../reducer/authslice"
import CreatePost from "./createPost"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
const Sidebar = () => {
  const user = useSelector((state) => state.auth.authDetail)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sidebardata = [
    {
      path: "/",
      pic: homeicon,
      title: "Home",
    },
    {
      path: "/messages",
      pic: chaticon,
      title: "Messages",
    },
    {
      path: "/Notification",
      pic: noticon,
      title: "Notifications",
    }
  ]
  const handleLogout = async() => {
    await updateDoc(doc(db,"Users",user?.userId),{
      online:false,
    })
    navigate("/")
    dispatch(logout())
    dispatch(cleanChatRoom())
  }
  return (<>
    <div id="SideBar">
      <img id="logo" style={{ width: "15rem", height: "4rem" }} src={logo} alt="logo" />
      <span style={{ flexDirection: "column" }}>
        {sidebardata?.map((item) => {
          return <div onClick={() => { navigate(item.path); dispatch(cleanChatRoom()) }}><img src={item.pic} alt={item.title} /><h2>{item.title}</h2> </div>
        })}
        <CreatePost />
        <div onClick={() => { navigate("/profile"); dispatch(cleanChatRoom()) }}><img style={{ borderRadius: "25px" }} src={user?.photo} alt="user" /><h2>Profile</h2> </div>
      </span>
      <div onClick={handleLogout}><img src={logouticon} alt="logout icon" /><h2>Logout</h2> </div>
    </div>
  </>)
};
export default Sidebar;
import homeicon from "../assets/images/home.png"
import chaticon from "../assets/images/chats.png"
import noticon from "../assets/images/notification.png"
import logo from "../assets/images/logoblack.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { cleanChatRoom } from "../reducer/authslice"
import CreatePost from "./createPost"
import Logout from "./logout";
// to navigate through all the set up routers
const Sidebar = () => {
  //  getting current user detail
  const user = useSelector((state) => state.auth.authDetail)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // navigation list for sidebar that has to be shown at left
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

  return (<>
    <div id="SideBar">
      <img id="logo" style={{ width: "15rem", height: "4rem" }} src={logo} alt="logo" />
      <span style={{ flexDirection: "column" }}>
        {sidebardata?.map((item) => {
          // clean chatrrom detail and navigating to differnet component 
          return <div onClick={() => { navigate(item.path); dispatch(cleanChatRoom()) }}><img src={item.pic} alt={item.title} /><h2>{item.title}</h2> </div>
        })}
        {/* to handle create post */}
        <CreatePost />
        {/* profile button */}
        <div onClick={() => { navigate("/profile"); dispatch(cleanChatRoom()) }}><img style={{ borderRadius: "25px" }} src={user?.photo} alt="user" /><h2>Profile</h2> </div>
      </span>
      {/* to handle logout */}
      <Logout />
    </div>
  </>)
};
export default Sidebar;
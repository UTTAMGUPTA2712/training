import homeicon from "../assets/images/home.png"
import chaticon from "../assets/images/chats.png"
import noticon from "../assets/images/notification.png"
import createicon from "../assets/images/create.png"
import logo from "../assets/images/logoblack.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import logouticon from "../assets/images/logout.png"
import { logout } from "../reducer/authslice"
import CreatePost from "./createPost"
const Sidebar = () => {
  const userpic = useSelector((state) => state.auth.authDetail?.photo)
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
    }, {
      path: "/create",
      pic: createicon,
      title: "Create",
    }, {
      path: "/profile",
      pic: userpic,
      title: "Profile",
    }
  ]
  const handleLogout = () => {
    navigate("/")
    dispatch(logout())
  }
  return (<>
    <div id="SideBar">
      <img id="logo" style={{ width: "15rem", height: "4rem" }} src={logo} />
      <span style={{ flexDirection: "column" }}>
        {sidebardata?.map((item) => {
          return <div onClick={() => navigate(item.path)}><img src={item.pic} /><h2>{item.title}</h2> </div>
        })}
      </span>
      <div onClick={handleLogout}><img src={logouticon} /><h2>Logout</h2> </div>
      <CreatePost />
    </div>
  </>)
};
export default Sidebar;
import { useDispatch, useSelector } from "react-redux"
import avataricon from "../assets/images/avatar.png"
import messageicon from "../assets/images/message.png"
import { logout } from "../redux/reducer/authSlice"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../pages/firbaseApp"
import logouticon from "../assets/images/lohout.png"
const SideBar = () => {
    const dispatch = useDispatch()
    const currentuser = useSelector((state) => state.auth.userAuth)
    const handlelogout = async () => {
        try {
            const id = currentuser.id;
            dispatch(logout());
            await updateDoc(doc(db, "users", id), {
                online: false
            })
        } catch (err) { console.log(err) }
    }
    return (<>
        <div id="side">
            <img src={messageicon} />
            <span>
            <img onClick={handlelogout} src={logouticon}/>
            <img src={currentuser.photo} /></span>
        </div>
    </>)
}
export default SideBar
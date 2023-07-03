import { useDispatch, useSelector } from 'react-redux'
import { cleanChatRoom, logout } from '../reducer/authslice'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../utils/firebase'
import logouticon from "../assets/images/logout.png"
//  to logout
const Logout = () => {
    // getting currentuser detail
    const user=useSelector(state=>state.auth.authDetail?.userId)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleLogout = async() => {
        // setting online status false 
        await updateDoc(doc(db,"Users",user),{
          online:false,
        })
        // navigating to main page clearing all  the data from store
        navigate("/")
        dispatch(logout())
        dispatch(cleanChatRoom())
      }
      return (<>
      {/* to handle logout */}
        <div onClick={handleLogout}><img src={logouticon} alt="logout icon" /><h2>Logout</h2> </div>
      </>)
}
export default Logout
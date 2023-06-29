import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/reducer/authSlice"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../pages/firbaseApp"
export const Logout = () => {
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
    handlelogout()
}
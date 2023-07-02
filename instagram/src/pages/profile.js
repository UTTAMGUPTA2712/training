import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../utils/firebase"
import { useSelector } from "react-redux"
import UserDetail from "../component/userdetail"

const Profile = () => {
    const userid = useSelector((state) => state.auth.authDetail.userId)
    const [userData, setUserData] = useState("")
    useEffect(() => {
        const getData = async () => {
            const data = await getDoc(doc(db, "Users", userid))
            setUserData(data.data())
        }
        getData()
    }, [])
    return (
        <>
        <UserDetail userData={userData} />
        </>
    )
}
export default Profile
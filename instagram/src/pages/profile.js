import { useEffect, useState } from "react"
import Sidebar from "../component/sidebar"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../utils/firebase"
import { useSelector } from "react-redux"

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
            <div id="grid">
                <Sidebar />
                <div>
                    <img src={userData.photo} />
                    <h1>{userData.username}</h1>
                    <h3>{userData.email}</h3>
                </div>
            </div>
        </>
    )
}
export default Profile
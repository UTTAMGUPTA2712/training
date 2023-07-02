import { useEffect, useState } from "react"
import Sidebar from "../component/sidebar"
import { doc, onSnapshot} from "firebase/firestore"
import { db } from "../utils/firebase"
import { useSelector } from "react-redux"

const Notifications = () => {
    const currentUser = useSelector(state => state.auth.authDetail?.userId)
    const [notifications, setnotifications] = useState([])
    useEffect(() => {
        const getData = onSnapshot(doc(db, "Users", currentUser), (snapshot) => {
            // console.log(snapshot)
            setnotifications(snapshot.data().notifications.reverse())
        })
        return ()=>getData()
    }, [currentUser])
    return (
        <>
            <div id="grid">
                <Sidebar />
                {(notifications.length>0)?<div id="notifications">{console.log("here",notifications.length>0)}
                    {notifications?.map((notification) => {
                        return <>
                            <div id="notify"><p>{notification.detail}</p><span>{notification.time}</span></div>
                        </>
                    })}
                </div>:<div id="nonotification"/>}
            </div>
        </>
    )
}
export default Notifications
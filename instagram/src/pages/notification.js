import { useEffect, useState } from "react"
import Sidebar from "../component/sidebar"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../utils/firebase"
import { useSelector } from "react-redux"

const Notifications = () => {
    // getting current user userid
    const currentUser = useSelector(state => state.auth.authDetail?.userId)
    // initialize the notification var
    const [notifications, setnotifications] = useState([])
    useEffect(() => {
        //  getting realtime notification
        const getData = onSnapshot(doc(db, "Users", currentUser), (snapshot) => {
            setnotifications(snapshot.data().notifications.reverse())
        })
        return () => getData()
    }, [currentUser])
    return (
        <>
            <div id="grid">
                <Sidebar />
                {/* handling if data exist show data or else show the image of no data */}
                {(notifications.length > 0) ? <div id="notifications">
                    {notifications?.map((notification) => {
                        return <>
                            <div id="notify"><p>{notification.detail}</p><span>{notification.time}</span></div>
                        </>
                    })}
                </div> : <div id="nonotification" />}
            </div>
        </>
    )
}
export default Notifications
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../utils/firebase"
import PostCard from "./postCard"
// show the post and filter by user if any data has been shared
const Posts = ({ user = "" }) => {
    // initialaizing post 
    const [post, setPost] = useState(null)
    useEffect(() => {
        // getting post order by there posting time
        const q = query(
            collection(db, "Posts"),
            orderBy("time", "desc"),
        )
        // getting realtime update
        const getPost = onSnapshot(q, (snapshot) => {
            const data = snapshot?.docs.map(doc =>doc.data())
            setPost(data)
        })
        return () => getPost()
    }, [])
    return (<>
        {/* showing all the post using post card */}
        {post?.map((data) => {
            // checking if the data that has been asked if a general use or to show in a users profile
                return (user === "" || user === data.sender)&&<PostCard data={data} />
        })}
    </>)
}
export default Posts
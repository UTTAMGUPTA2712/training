import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../utils/firebase"
import PostCard from "./postCard"

const Posts = ({ user = "" }) => {
    const [post, setPost] = useState(null)
    useEffect(() => {
        const getPost = onSnapshot(collection(db, "Posts"), (snapshot) => {
            const data = snapshot?.docs.map(doc => doc.data())
            const neededdata=data.reverse()
            setPost(neededdata)
        })
        return () => getPost()
    }, [])
    console.log("",post)
    return (<>
        {post?.map((data) => {
            if (user === "" || user === data.sender) {
                return <PostCard data={data} />
            }
        })}
    </>)
}
export default Posts
import { collection, doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../utils/firebase"
import PostCard from "./postCard"

const Posts = ({ user }) => {
    const [post, setPost] = useState(null)
    useEffect(() => {
        const getPost = onSnapshot(collection(db, "Posts"), (snapshot) => {
            const data = snapshot?.docs.map(doc => doc.data())
            setPost(data)
        })
        return () => getPost()
    }, [])
    return (<>
        {post?.map((data) => {
            return <PostCard data={data} />
        })}
    </>)
}
export default Posts
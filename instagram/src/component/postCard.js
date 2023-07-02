import { getDownloadURL, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { db, firebaseStorage } from '../utils/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

const PostCard = ({ data }) => {
    const postref = ref(firebaseStorage, data.path)
    const [url, setUrl] = useState("")
    const [user, setuser] = useState("")
    useEffect(() => {
        const geturl = async () => {
            const gotdata = await getDownloadURL(postref)
            setUrl(gotdata)
            const snap = await getDoc(doc(db, "Users", data.sender))
            setuser(snap.data())
        }
        geturl()

    }, [])
    console.log("user", user)
    return (
        <>
            <div id='post'>
                <span><img src={user?.photo} />{user?.username}</span>
                <div style={{ backgroundImage: "url(" + url + ")" }}></div>
                <button>❤️ {data?.likes?.length}</button><button>Comment {data?.likes?.length}</button>
                <p>{data.description}</p><span>{console.log((data?.time))}</span>
            </div>
        </>
    )
}

export default PostCard
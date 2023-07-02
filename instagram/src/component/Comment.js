import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase'
import { useSelector } from 'react-redux'

const Comment = ({ data }) => {
    const [comments, setComments] = useState([])
    const user = useSelector((state) => state.auth.authDetail)
    useEffect(() => {
        const data = onSnapshot(doc(db, "Posts", data), (snapshot) => {
            setComments(snapshot.comment)
        })
        return () => data()
    }, [])
    const AddComment = () => {

    }
    return (
        <div>{
            comments?.map((comment) => {
                return <div>working</div>
            })
        }</div>
    )
}

export default Comment
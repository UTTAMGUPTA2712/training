import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../utils/firebase'
import { useSelector } from 'react-redux'
import commenticon from "../assets/images/comment.png"
import { Modal } from 'antd';
import InputEmoji from "react-input-emoji";

const Comment = ({ comments, id, sender }) => {
    const [userComment, setUserComment] = useState("")
    const [open, setOpen] = useState(false);
    const currentUser = useSelector((state) => state.auth.authDetail)
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const AddComment = async () => {
        await updateDoc(doc(db, "Posts", id), {
            comment: arrayUnion({
                user: currentUser.username,
                detail: userComment,
            })
        })
        setUserComment("")
        const notificationData = {
            detail: `${currentUser.username} commented ${userComment} on your post with PostId ${id}`,
            time: (new Date()).toUTCString()
        }
        await updateDoc(doc(db, "Users", sender), {
            notifications: arrayUnion(notificationData)
        })
    }
    return (
        <>
            <Modal
                open={open}
                title="COMMENTS"
                onOk={handleOk}
                onCancel={handleCancel}
                width={"30rem"}
                footer={[]}>
                <div id='comments'>{
                    comments?.map((comment) => {
                        return <div>
                            <p><span>{comment.user}</span> {comment.detail}</p>
                        </div>
                    })
                }</div>
                <div id="textSender">
                    <InputEmoji
                        value={userComment}
                        onChange={setUserComment}
                        cleanOnEnter
                        onEnter={AddComment}
                        placeholder="Type a message"
                    />
                </div>
            </Modal>
            <img onClick={showModal} src={commenticon} alt='Comment Icon' />
        </>
    )
}

export default Comment
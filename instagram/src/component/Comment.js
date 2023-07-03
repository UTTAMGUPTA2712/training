import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../utils/firebase'
import { useSelector } from 'react-redux'
import commenticon from "../assets/images/comment.png"
import { Modal } from 'antd';
import InputEmoji from "react-input-emoji";
//  handle comment of a post
const Comment = ({ comments, id, sender }) => {
    // initialize comments and modalopen  and get logged user
    const [userComment, setUserComment] = useState("")
    const [open, setOpen] = useState(false);
    const currentUser = useSelector((state) => state.auth.authDetail)
    // triggers for comment modal
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    // add comments 
    const AddComment = async () => {
        // update the comment of the post by adding the new comment
        await updateDoc(doc(db, "Posts", id), {
            comment: arrayUnion({
                user: currentUser.username,
                detail: userComment,
            })
        })
        setUserComment("")
        // add notification to the sender of the post
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
        {/* comment modal */}
            <Modal
                open={open}
                title="COMMENTS"
                onOk={handleOk}
                onCancel={handleCancel}
                width={"30rem"}
                footer={[]}>
                    {/* showing comment */}
                <div id='comments'>{
                    comments?.map((comment) => {
                        return <div>
                            <p><span>{comment.user}</span> {comment.detail}</p>
                        </div>
                    })
                }</div>
                <div id="textSender">
                    {/* text box with emoji feature */}
                    <InputEmoji
                        value={userComment}
                        onChange={setUserComment}
                        cleanOnEnter
                        onEnter={AddComment}
                        placeholder="Type a message"
                    />
                </div>
            </Modal>
            {/* trigger comment modal */}
            <img onClick={showModal} src={commenticon} alt='Comment Icon' />
        </>
    )
}

export default Comment
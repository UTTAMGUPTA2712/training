import React from 'react';
import { Button, Modal, message, Upload } from 'antd';
import { useState } from 'react';
import { db, firebaseStorage } from '../utils/firebase';
import { ref, uploadBytes } from "firebase/storage";
import { useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { PlusOutlined } from '@ant-design/icons';
const CreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const currentUser = useSelector((state) => state.auth.authDetail)
    const id = uniqid()
    const [post, setPost] = useState({ comment: [], likes: [], sender: currentUser.userId, postId: id })
    const [fileList, setFileList] = useState([]);
    console.log(fileList)
    const handleEdit = (title, value) => {
        setPost((p) => ({ ...p, [title]: value }))
    }
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {
        setLoading(true);
        const path = currentUser.userId + "/" + fileList?.[0].name;
        const storageRef = ref(firebaseStorage, path);
        const uploaded = await uploadBytes(storageRef, fileList?.[0].originFileObj)
        if (uploaded) {
            { console.log("post", post, fileList?.[0]) }
            await setDoc(doc(db, "Posts", id), { ...post, path: path, time: serverTimestamp() }).then(
                () => {
                    message.success('Post Uploaded Successfully!');
                }
            ).catch(
                (err) => console.error(err)
            )
            setLoading(false);
            setOpen(false);
        }
        setPost({ comment: [], likes: [], sender: currentUser.userId, postId: id })
        setFileList([])
    };
    const handleCancel = () => {
        setOpen(false);
        setPost({ comment: [], likes: [], sender: currentUser.userId, postId: id })
        setFileList([])
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <>
            <Modal
                open={open}
                title="Create Post"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button disabled={(fileList?.[0] && post?.description) ? false : true} key="submit" type="primary" loading={loading} onClick={handleOk}>
                        POST
                    </Button>,
                ]}>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChange}>
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <input type='text' onChange={(e) => handleEdit("description", e.target.value)} value={post?.description} />
            </Modal>
            <button onClick={showModal}>Create</button>
        </>
    )
}

export default CreatePost
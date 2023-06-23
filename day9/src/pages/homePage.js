import { useSelector, useDispatch } from "react-redux"
import { FolderAddOutlined, FolderViewOutlined, DeleteOutlined, DownloadOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ResumeCard from "../component/resumeCard";
import { useState } from "react";
import { Modal } from "antd";
import { deleter } from "../redux/slice/resumeSlice";
import JsPDF from "jspdf";
import { logout } from "../redux/slice/authSlice";
const HomePage = () => {
    const userdata = useSelector((state) => state.auth.phoneNumber)
    const data = useSelector((state) => state.resume.users[userdata])
    const [resumedata, setResumedata] = useState(data)
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleDelete = (index) => {
        dispatch(deleter({ user: userdata, index: index }))
    }
    const handleView = () => {
        console.log("gxvasjgxv")
        setIsModalOpen(true);
    }
    const handledown = () => {
        const doc = new JsPDF("portrait", "pt", "a4");
        doc.html(document.querySelector("#modal")).then(() => {
            doc.save("resume.pdf")
        })
    }
    return (<>
        <LogoutOutlined id="logout" onClick={() => { dispatch(logout()); navigate("/") }} />
        <Modal width={"44vw"} title="VIEW RESUME" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div id="modal"><ResumeCard id="downdata" data={resumedata} /></div>
        </Modal>
        <div id="resumediv">
            {data.map((cv, index) => {
                return <>
                    <div id="resumecard"><div id="carddata"><ResumeCard data={cv} index={index} /></div>
                        <div id="btn">
                            <DownloadOutlined onClick={() => { handledown(); setResumedata(cv) }} />
                            <FolderViewOutlined onClick={() => { setResumedata(cv); handleView() }} />
                            <DeleteOutlined onClick={() => handleDelete(index)} /></div></div>
                </>
            })}</div>
        <FolderAddOutlined onClick={() => navigate("/template")} id="addresume" />
    </>)
}
export default HomePage
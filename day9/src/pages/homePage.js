import { useSelector, useDispatch } from "react-redux"
import { FolderAddOutlined, FolderViewOutlined, DeleteOutlined, DownloadOutlined, LogoutOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ResumeCard from "../component/resumeCard";
import { useState } from "react";
import { deleter, templateUpdater } from "../redux/slice/resumeSlice";

import jsPDF from "jspdf";
import Header from "../component/header";
import Preview from "../component/preview";
const HomePage = () => {
    const userdata = useSelector((state) => state.auth.phoneNumber)
    const data = useSelector((state) => state.resume.users[userdata])
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()
    const [template, settemplate] = useState("")
    const [formtype, setformtype] = useState("")
    const changeformtypesort = (value) => {
        setformtype(value)
    }
    const changetemplatesort = (value) => {
        settemplate(value)
    }
    const handleDelete = (index) => {
        dispatch(deleter({ user: userdata, index: index }))
    }
    const handledown = (data) => {
        const report = new jsPDF('portrait', 'pt', 'a4');
        const element = document.querySelector('#res' + data);
        const options = {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
          html2canvas: {
            scale: 2.8 
          }
        };
        report.html(element, options).then(() => {
          report.save(userdata+'resume.pdf');
        });
    }
    const changetemplate = (value, index) => {
        dispatch(templateUpdater({ user: userdata, index: index, value: value }))
    }
    const editResume = (value, index) => {
        navigate("/form", { state: { data: value, index: index } })
    }
    console.log(template, formtype)
    return (<>
        <div id="mainbody">
            <Header template={template} formtype={formtype} changeformtype={changeformtypesort} changetemplate={changetemplatesort} />
            <div id="resumediv">
                {data.map((cv, index) => {
                    if ((template == "" || cv.templatedata == template) && (formtype == "" || cv.formtype == formtype)) {
                        return <>
                            <div id="resumecard"><div id={"res" + index} className="carddata"><ResumeCard data={cv} index={index} /></div>
                                <div id="btn">
                                    <DownloadOutlined onClick={() => { handledown(index) }} />
                                    <Preview changetemplate={changetemplate} data={cv} index={index} />
                                    <DeleteOutlined onClick={() => handleDelete(index)} />
                                    {(cv.formtype == "draft") && <EditOutlined onClick={() => editResume(cv, index)} />}
                                </div></div>
                        </>
                    }
                })}</div>
            <FolderAddOutlined onClick={() => navigate("/template")} id="addresume" />
        </div>
    </>)
}
export default HomePage
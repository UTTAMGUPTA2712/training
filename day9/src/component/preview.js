import { useState } from "react"
import TemplateOption from "./templateoption"
import ResumeCard from "./resumeCard"
import { Button, Modal } from 'antd';
import { FolderAddOutlined, FolderViewOutlined, DeleteOutlined, DownloadOutlined, LogoutOutlined,EditOutlined } from "@ant-design/icons";

const Preview = ({ changetemplate,data,index }) => {
    const [option, setoption] = useState(1)
    const changeOption = (value) => {
        setoption(value)
    }
    console.log("pre",data)
    const [isTemplateChangerOpen, setIsTemplateChangerOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const showTemplateChanger = () => {
        setIsTemplateChangerOpen(true);
    };
    const handletemplateOk = () => {
        setIsTemplateChangerOpen(false);
        changetemplate(option,index);
    };
    const showPreview = (e) => {
        e.preventDefault()
        setIsPreviewOpen(true);
    };
    const handleOk = () => {
        setIsPreviewOpen(false);
    };
    const handleCancel=()=>{
        setIsTemplateChangerOpen(false);
    }
    return (<>
        <FolderViewOutlined onClick={showPreview}/>
        <Modal  title="Choose The template you like" open={isTemplateChangerOpen} cancelText="Close" okText="Save Changes" onCancel={handleCancel} onOk={handletemplateOk} width="1000px">
            <TemplateOption changeoption={changeOption} option={option} />
        </Modal>
        <Modal title="RESUME PREVIEW" open={isPreviewOpen} onOk={showTemplateChanger} okText="Change Template" onCancel={handleOk} width="750px">
            <div id="modal"><ResumeCard data={data} /></div>
        </Modal>
    </>)
}
export default Preview
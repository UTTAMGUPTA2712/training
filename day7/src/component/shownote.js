import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
const Shownote = ({ open, closeModal, data }) => {
    const handleOk = () => {
        setTimeout(() => {
            closeModal();
        }, 200);
    };
    useEffect(() => {
        var body = document.getElementById("showcontant");
        if (body != null) {
            body.innerHTML = data?.content;
        }
    }, [open]);
    return (
        <>
            <Modal title={data?.title} open={open} onOk={handleOk} onCancel={closeModal}>
                <div id="showcontant"></div>
            </Modal>
        </>
    );
};
export default Shownote;

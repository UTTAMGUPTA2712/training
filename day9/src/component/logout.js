import { useDispatch } from "react-redux";
import { Modal } from "antd";
import {LogoutOutlined}from "@ant-design/icons";
import { useState } from 'react';
import { logout } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
const Logout=()=>{
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Confirm To LOGOUT');
    const dispatch=useDispatch()
    const showModal = () => {
      setOpen(true);
    };
    const navigate=useNavigate()
    const handleOk = () => {
      setModalText('LOGGING OUT!!');
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        dispatch(logout()); navigate("/");
      }, 2000);
    };
    const handleCancel = () => {
      setOpen(false);
    };
    return(<>
        <LogoutOutlined id="logout" onClick={showModal} />
        <Modal
        title="LOGOUT??"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>)
}
export default Logout
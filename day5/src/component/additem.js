import { Button, Modal } from 'antd';
import { useState } from 'react';
const AddItem = ({isModalOpen,setIsModalOpen}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal title={<h1>ADD ITEM :</h1>}  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div id='modeldiv'>
      <div><label>ENTER NAME : </label><input></input></div>
      <div><label>ENTER DESCRIPTION : </label><input></input></div>
      <div><label>ENTER PRICE : </label><input></input></div>
      </div>
      </Modal>
    </>
  );
};
export default AddItem;
import { Button, Modal } from 'antd';
import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {Upload } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/slice/shopSlice';
import { SaveItem } from '../services/saveItem';

const AddItem = ({ isModalOpen, setIsModalOpen }) => {
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [modal, contextHolder] = Modal.useModal();
  const userEmail=useSelector(state=>state.shop.currentUser?.email)
  // let localStoragedata = JSON.parse(localStorage.getItem("data"));
  const dispatch=useDispatch()
  const randomNumberGenerator = () => {
    return Math.floor(Math.random() * 899999 + 100000);
  };
  const clearModal = () => {
    setIsModalOpen(false);
    setImg(undefined);
    setName('');
    setDescription('');
    setPrice('');
    document.getElementById('modeldiv').reset();
  };

  const confirm = () => {
    modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'SOME FIELDS ARE EMPTY. CLOSING WILL LOSE ALL THE DATA.',
      okText: 'CLOSE ANYWAY',
      cancelText: 'OK',
      onOk: clearModal,
    });
  };

  const handleOk =async () => {
    if (!name || !description || !price) {
      confirm();
      return;
    }
    
    // let localData = JSON.parse(localStorage.getItem("data"))||[]
    const newitemdata = {
      id: randomNumberGenerator(),
      // image: img,
      name: name,
      description: description,
      price: price,
      published:false,
      // user:JSON.parse(localStorage.getItem("currentUser")).email,
      user:userEmail,
      count:0
    };
    // localData.push(newitemdata)
    // localStorage.setItem('data', JSON.stringify(localData));
    try {
      const response=await SaveItem(newitemdata);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    dispatch(addItem(newitemdata));
    clearModal();
    // console.log(img);
  };

  const handleCancel = () => {
    clearModal();
  };

  return (
    <>
      <Modal title={<h1>ADD ITEM :</h1>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <form id="modeldiv">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            maxCount={1}
            onChange={(e) => { setImg(e.file) }}>
            <Button icon={<UploadOutlined />}>Upload</Button>
            <h6>If not provided, a default image will be uploaded.</h6>
          </Upload>
          {/* <img src={img?URL.createObjectURL(img):""}></img> */}
          <div>
            <label>ENTER NAME: </label>
            <input onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>ENTER DESCRIPTION: </label>
            <input onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label>ENTER PRICE: </label>
            <input type='number' onChange={(e) => setPrice(e.target.value)} />
          </div>
        </form>
        {contextHolder}
      </Modal>
    </>
  );
};

export default AddItem;

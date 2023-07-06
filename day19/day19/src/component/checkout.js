import { useEffect, useState } from "react";
import { FolderAddOutlined, StarFilled, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ClearCart from "./clearcart";
import { Space, Typography, Form, Input, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slice/shopSlice";


const CheckOut = () => {
    // let user = JSON.parse(localStorage.getItem("currentUser"));
    const user=useSelector(state=>state.shop.currentUser)
    const [total, settotal] = useState(0)
    const [modal, contextHolder] = Modal.useModal();
    let sum = 0
    let cart = user.cart || []
    const dispatch=useDispatch()
    // useEffect(() => {
    //     if (cart.length > 0) {

    //         for (let item of cart) {
    //             if (item.count > 0) {
    //                 sum += (item.count * item.price)
    //             }
    //             settotal(sum)
    //         }
    //         sum = 0;
    //     }
    // }, [user])
    const confirm = () => {
        modal.confirm({
            title: 'CHECKOUT',
            icon: <CheckCircleOutlined />,
            content: "Confirm To CheckOut",
            okText: "CHECKOUT",
            cancelText: 'Not Yet',
            onOk: () => { 
                // ClearCart(); window.location.reload()
            dispatch(clearCart())
            },
        });
    };
    const handleclick = () => {
        confirm()
    }
    return (<>
        <div id="checkcontainer">
            {contextHolder}
            <h1>{(user.name).toUpperCase()}</h1>
            <h2>{(user.lastname).toUpperCase()}</h2>
            <h3>Your Grand Total: ${total}</h3>
            <button onClick={handleclick}>CHECKOUT <CheckCircleOutlined /></button>
        </div>
    </>)
}
export default CheckOut
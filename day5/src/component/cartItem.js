import { useState } from "react";
import defaultimg from "../assets/images/default.png"
import SetCart from "./setcart";
const CartItem = ({ click,countclick, data: { id, image, name, description, price, count } }) => {
    const [countitem, setCount] = useState(count)
    const imagepic = (image) ? (image.originFileObject) : defaultimg
    function debounce(val = 0, wait = 1800) {
        let timeout;
        console.log("running")
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            clearTimeout(timeout);
            SetCart(id, countitem + val)
            countclick(1+click)
        }, wait);
    };
    return (
        <>
            <div id="cartitem" className="white">
                <img id="cartitemimg" src={imagepic}>{image}</img>
                <div id="cartitemdescription"><h1 >{name}</h1>
                    <h5 >{description}</h5></div>
                <h1 id="cartitemprice">${price}</h1>
                <div id="cartbtndiv" >
                    <button className="decrement" onClick={() => { setCount(countitem - 1); debounce(-1); }}>-</button>
                    <span>{countitem}</span>
                    <button className="increment" onClick={() => { setCount(1 + countitem); debounce(1); }}>+</button>
                </div>
            </div>
        </>
    );
};
export default CartItem;
import { useState } from "react";
import defaultimg from "../assets/images/default.png"
import DeleteItem from "./deleteitem";
import PublishItem from "./publishitem";
import SetCart from "./setcart";
const ItemCard = ({data: { id, image, name, description, price, user, published } }) => {
    const title = JSON.parse(localStorage.getItem("currentUser")).title;
    const usermail = JSON.parse(localStorage.getItem("currentUser")).email;
    const [count, setCount] = useState(0)
    const imagepic = (image) ? (image.originFileObject) : defaultimg
    function debounce(val=0,wait = 1800) {
        let timeout;
            console.log("running")
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                clearTimeout(timeout);
                SetCart(id,count+val)
            }, wait);
    };
    return (
        <>
            <div id="item" className="white">
                <img id="itemimg" src={imagepic}>{image}</img>
                <h3 id="itemname">{name}</h3>
                <h5 id="itemdescription">{description}</h5>
                <h4 id="itemprice">${price}</h4>
                <div className="buttondiv">
                    {count == 0 ? (
                        <button disabled={published==false} className="addbtn" onClick={() => {setCount(1+count);debounce(1);  }}>
                            ADD ITEM +
                        </button>
                    ) : (
                        <>
                            <button className="decrement" onClick={() => {setCount(count-1);debounce(-1); }}>-</button>
                            <span>{count}</span>
                            <button className="increment" onClick={() => {setCount(1+count);debounce(1);  }}>+</button>
                        </>
                    )}
                </div>
                {(title == "ADMIN" || (title == "VENDOR" && usermail == user&&published==false)) && <div id="optiondiv">
                    <button className="red" onClick={() => { DeleteItem(id = { id }); window.location.reload() }}>DELETE</button>
                    {(published == false) && <button className="green" onClick={() => { PublishItem(id = { id }); window.location.reload() }}>PUBLISH</button>}</div>}
            </div>
        </>
    );
};
export default ItemCard;
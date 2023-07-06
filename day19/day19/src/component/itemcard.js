import { useState } from "react";
import defaultimg from "../assets/images/default.png"
// import DeleteItem from "./deleteitem";
// import PublishItem from "./publishitem";
import SetCart from "./setcart";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, publishItem, setItem } from "../redux/slice/shopSlice";
import { PublishItem } from "../services/publishitem";
import { DeleteItem } from "../services/deleteItem";
const ItemCard = ({ data: { id, _id, image, name, description, price, user, published } ,countnum}) => {
    // const title = JSON.parse(localStorage.getItem("currentUser")).title;
    const title = useSelector(state => state.shop.currentUser?.title)
    // const usermail = JSON.parse(localStorage.getItem("currentUser")).email;
    const usermail = useSelector(state => state.shop.currentUser?.email)
    const dispatch = useDispatch()
    const [count, setCount] = useState(countnum
        
        )
    const imagepic = (image) ? (image.originFileObject) : defaultimg
    function debounce(val = 0, wait = 1800) {
        let timeout;
        // console.log("running")
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            clearTimeout(timeout);
            dispatch(setItem({ id: id, count: count + val }))
            // SetCart(id,count+val)
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
                    {count === 0 ? (
                        <button disabled={published === false} className="addbtn" onClick={() => { setCount(1 + count); debounce(1); }}>
                            ADD ITEM +
                        </button>
                    ) : (
                        <>
                            <button className="decrement" onClick={() => { setCount(count - 1); debounce(-1); }}>-</button>
                            <span>{count}</span>
                            <button className="increment" onClick={() => { setCount(1 + count); debounce(1); }}>+</button>
                        </>
                    )}
                </div>
                {(title === "ADMIN" || (title === "VENDOR" && usermail === user && published === false)) && <div id="optiondiv">
                    <button className="red" onClick={async () => {
                        // DeleteItem(id = { id }); window.location.reload()
                        dispatch(deleteItem(id));
                        try {
                            const response = await DeleteItem(_id);
                            console.log(response);
                        } catch (error) {
                            console.error(error);
                        }
                    }}>DELETE</button>
                    {(published === false) && <button className="green" onClick={async () => {
                        // PublishItem(_id = { _id }); window.location.reload()
                        dispatch(publishItem(id));
                        try {
                            const response = await PublishItem(_id);
                            console.log(response);
                        } catch (error) {
                            console.error(error);
                        }
                    }}>PUBLISH</button>}</div>}
            </div>
        </>
    );
};
export default ItemCard;
import { useState } from "react";
import Item from "../component/item";
import data from "../mock.json";
import Cart from "../component/cart";
const Mainpage = (query) => {
    const [itemCount, setItemCount] = useState(new Array(10).fill(0));
    const [count, setCount] = useState(0)
    const addItem = (index) => {
        console.log(itemCount);
        setItemCount((itemCount) => {
            const prev = [...itemCount];
            prev[index] += 1;
            return prev;
        });
        setCount(1+count)
    };
    const removeItem = (index) => {
        console.log(itemCount);
        setItemCount((itemCount) => {
            const prev = [...itemCount];
            prev[index] -= 1;
            return prev;
        });
        setCount(count-1)
    };
    const handlesubmit=()=>{
        let sum=0;
        for(let i=0;i<itemCount.length;i++){
                    sum=+sum+(+itemCount[i])*(+(data[i].price));
                    console.log(sum);
                }
        alert("Your total is : $"+sum);
        setItemCount(new Array(10).fill(0))
        setCount(0)
    }
    return (
        <>
        <Cart count={count}></Cart>
        
        <div id="itemlist">
            {data.map((item, index) => {
                const id=item.name;
                console.log(id);
                return (
                    <>
                        {(!query.query || item.name.includes(query.query)) && (
                            <div className="items" key={id}>
                                <Item data={item}></Item>

                            <div className="buttondiv">
                        {itemCount[index] == 0 ? (
                            <button className="addbtn" onClick={() => {addItem(index);}}>
                                ADD ITEM +
                            </button>
                        ) : (
                            <>
                                <button className="decrement" onClick={() => {removeItem(index);}}>-</button>
                                <span>{itemCount[index]}</span>
                                <button className="increment" onClick={() => {addItem(index);}}>+</button>
                            </>
                        )}
                            </div>
                        </div>
                        )}
                    </>
                );
            })}
</div>
            <button className="addbtn" id="submit" onClick={()=>{handlesubmit()}}>SUBMIT</button>
        </>
    );
};
export default Mainpage;

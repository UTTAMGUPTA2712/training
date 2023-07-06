import { useEffect, useState } from "react"
import Navigation from "../component/navigation"
import CartItem from "../component/cartItem"
import CheckOut from "../component/checkout"
import { useSelector } from "react-redux"

const Cart = () => {
    const keyval = "3"
    // const [cart, setcart] = useState([])
    const cart=useSelector(state=>state.shop.currentUser?.cart)??[]
    const items=useSelector(state=>state.shop.itemList)
    const [click, setclick] = useState()
    const countclick = (count) => {
        setclick(count)
    }
    console.log("sxs",cart)
    // useEffect(() => {
    //     const data = localStorage.getItem("currentUser")
    //     const cartvalue = JSON.parse(data).cart || []
    //     setcart(cartvalue)
    //     // console.log(cartvalue)
    // }, [click])
    return (
        <>
            <div id="cartcontainer">
                <div id="carthome">
                    <Navigation keyval={keyval} />
                    <div id="list" className={cart? "nonempty" : "emptycart"}>{
                        (cart)&&<>
                        <div id="cartitemhead" className="white">
                            <div style={{ width: "10%", textAlign: "center" }} ><h2>LOGO</h2></div>
                            <div id="cartitemdescription"><h2 >DESCRIPTION</h2></div>
                            <h2 id="cartitemprice">PRICE($)</h2>
                            <div id="cartbtndiv" >
                            </div>
                        </div>
                        {
                            items.map((item) => {
                                return (cart[item.id]) && <CartItem click={click} countclick={countclick} data={item} count={cart[item.id]} />
                            })
                        }
                        </>}
                    </div>
                </div>
                <div id="checkout"><CheckOut /></div>
            </div>
        </>
    )
}
export default Cart
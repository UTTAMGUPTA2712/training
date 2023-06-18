import { useEffect, useState } from "react"
import Navigation from "../component/navigation"
import CartItem from "../component/cartItem"
import CheckOut from "../component/checkout"

const Cart = () => {
    const keyval = "3"
    const [cart, setcart] = useState([])
    const [click, setclick] = useState()

    const countclick = (count) => {
        setclick(count)
    }
    useEffect(() => {
        const data = localStorage.getItem("currentUser")
        const cartvalue = JSON.parse(data).cart || []
        setcart(cartvalue)
        // console.log(cartvalue)
    }, [click])
    return (
        <>
            <div id="cartcontainer">
                <div id="carthome">
                    <Navigation keyval={keyval} />
                    <div id="list" className={cart.length > 0 ? "nonempty" : "emptycart"}>{
                        (cart.length>0)&&<>
                        <div id="cartitemhead" className="white">
                            <div style={{ width: "10%", textAlign: "center" }} ><h2>LOGO</h2></div>
                            <div id="cartitemdescription"><h2 >DESCRIPTION</h2></div>
                            <h2 id="cartitemprice">PRICE($)</h2>
                            <div id="cartbtndiv" >
                            </div>
                        </div>
                        {
                            cart.map((item) => {
                                if (item.count > 0) return <><CartItem click={click} countclick={countclick} data={item} /><CartItem countclick={countclick} data={item} /></>
                                else { return <></> }
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
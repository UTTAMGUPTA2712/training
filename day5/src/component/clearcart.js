import { useEffect } from "react";

const ClearCart=()=>{
    // useEffect(()=>{
    let user=JSON.parse(localStorage.getItem("currentUser"));
    user.cart=[]
    console.log(JSON.parse(localStorage.getItem("currentUser")))
    localStorage.setItem("currentUser",JSON.stringify(user))
    // ,[])
    // return 
}
export default ClearCart
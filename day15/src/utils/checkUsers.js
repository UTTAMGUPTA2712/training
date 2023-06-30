import { collection, getDocs } from "firebase/firestore"
import { db } from "./firebase"

export const CheckUsers=async(email,password="")=>{
    const data=await getDocs(collection(db,"Users"))
    console.log("all user data",data)
    const dupicate=data.docs.filter(d=>{console.log(d.data().email,email,d.data().password,password);return (d.data().email===email&&(password==""||d.data().password===password))})
        console.log("dupllicatevalue",dupicate);
    if(dupicate.length>0){
        return dupicate
    }else{
        return ""
    }
}
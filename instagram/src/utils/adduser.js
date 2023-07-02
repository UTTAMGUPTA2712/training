import { doc, setDoc } from "firebase/firestore"
// import { RandomID } from "./randonId"
import { db } from "./firebase"
import uniqid from 'uniqid';
export const AddUser=async(data)=>{
    const id=uniqid.process()
    const userid=id.toString()  
    const newData={...data,userId:userid,notifications:[]}
    console.log("here",newData, userid)
    await setDoc(doc(db,"Users",userid),newData).catch(err=>console.log(err))
    return newData
}
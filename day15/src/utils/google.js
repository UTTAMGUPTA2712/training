import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { CheckUsers } from "./checkUsers";
import { AddUser } from "./adduser";
import { db, firebaseApp } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

export const Google=async()=>{
    try {
        const result=await signInWithPopup(auth, provider)
        const userData=await CheckUsers(result.user.email)
        console.log(userData)
        if(userData=="") {
            const sendingdata={
                email:result.user.email,
                username:result.user.displayName,
                photo:result.user.photoURL,
                online:true,
            }
            const data=await AddUser(sendingdata)
            return data
        }else{
            updateDoc(doc(db,"Users",userData?.[0].data().userId),{online:true})
            return userData?.[0].data()
        }
    }
    catch (error) {
        console.log(error)
    }            
}
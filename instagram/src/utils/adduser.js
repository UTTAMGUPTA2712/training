import { doc, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import uniqid from 'uniqid';
// add user in the document using all the data that has been provided
export const AddUser = async (data) => {
    const id = uniqid()
    const userid = id.toString()
    // setting up the complete data
    const newData = { ...data, userId: userid, notifications: [] }
    // saving user at id that is same as the userid of user for ease of navigation
    await setDoc(doc(db, "Users", userid), newData).catch(err => console.log(err))
    // returning the data that has been saved in document
    return newData
}
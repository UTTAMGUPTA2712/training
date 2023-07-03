import { collection, getDocs } from "firebase/firestore"
import { db } from "./firebase"
// it takes the data of email and password as google signup don't send any password it handles that as well
export const CheckUsers = async (email, password = "") => {
    // getting all users
    const data = await getDocs(collection(db, "Users"))
    // cheking if the user with same id exist if yes then send the data or else send the empty string
    const dupicate = data.docs.filter(d => { return (d.data().email === email && (password === "" || d.data().password === password)) })
    if (dupicate.length > 0) {
        return dupicate
    } else {
        return ""
    }
}
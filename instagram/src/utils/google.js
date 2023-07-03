import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { CheckUsers } from "./checkUsers";
import { AddUser } from "./adduser";
import { db, firebaseApp } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";
//initialising google auth provider from firebase
const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

export const Google = async () => {
    try {
        // using sign in with popup feature of firebase auth
        const result = await signInWithPopup(auth, provider)
        // checking if the data that has been gotten matches any existing user
        const userData = await CheckUsers(result.user.email)
        if (userData === "") {
            // if no data then create a new user data

            const sendingdata = {
                email: result.user.email,
                username: result.user.displayName,
                photo: result.user.photoURL,
                online: true,
            }
            // add user by sending data
            const data = await AddUser(sendingdata)
            // return the data of added user 
            return data
        } else {
            // if user already exist them update its onlne status
            updateDoc(doc(db, "Users", userData?.[0].data().userId), { online: true })
            // return the data of user
            return userData?.[0].data()
        }
    }
    catch (error) {
        // logging error if any
        console.log(error)
    }
}
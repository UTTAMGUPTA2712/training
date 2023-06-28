import { Select } from 'antd';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../pages/firbaseApp";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { saveUserAuth, setallusers, setchatroomid } from '../redux/reducer/authSlice';
const Search = () => {
    const [uservalue, setUservalue] = useState()
    const [optiondata, setoptiondata] = useState([])
    const loggeduser = useSelector((state) => state.auth.userAuth)
    const onSearch = (value) => {
        setUservalue(value)
    };
    const dispatch = useDispatch()
    const allusers=useSelector((state) => state.auth.allusers)
    useEffect(() => {
        const setdata = async () => {
            const data = await getDocs(collection(db, "users"))
            const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setoptiondata([])
            console.log(users)
            users.map((user) => { if (loggeduser.userId != user.userId){ setoptiondata(p => [...p, { value: user.userId, label: user.name }])}else{dispatch(saveUserAuth(user))} })
            dispatch(setallusers(users))
        }
        setdata()
    }, [uservalue])
    const userssss=useSelector((state) => state.auth.userAuth)
    console.log(userssss)

    const saveChatid = async (chatroomid) => {
        const adduser=allusers.filter((user)=>user.userId == uservalue)
        console.log("", adduser[0])
        await addDoc(collection(db, "chatRooms"), {
            chatRoomId: chatroomid,
            messages: [],
            sender: loggeduser,
            receiver: adduser[0]
        })
    }
    const handleStartChat = async () => {
        if (uservalue) {
            const chatroomid = (uservalue < (loggeduser.userId)) ? ("" + uservalue + (loggeduser.userId)) : ("" + (loggeduser.userId) + uservalue)
            dispatch(setchatroomid(chatroomid))
            const chatid = await getDocs(collection(db, "chatRooms"))
            console.log("", chatroomid,chatid)
            const getchatid = chatid?.docs.filter((id) => id.data().chatRoomId == chatroomid)
            console.log("getchatid", getchatid[0]?.data())
            if (getchatid.length == 0) {
                saveChatid(chatroomid)
            }
            setUservalue("")
        }
    }
    return (<>
        <Select
            id="searchuser"
            showSearch
            placeholder="Select a person to start Chat"
            optionFilterProp="children"
            onChange={onSearch}
            onSearch={onSearch}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={optiondata}
        />
        <button onClick={handleStartChat} style={{ backgroundColor: "#2c3b44", color: "#1EBEA5", border: "1px solid black"}}>Start</button>
    </>)
}
export default Search
import { Select } from 'antd';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../pages/firbaseApp";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setchatroomid } from '../redux/reducer/authSlice';
const Search = () => {
    const [uservalue, setUservalue] = useState()
    const [optiondata, setoptiondata] = useState([])
    const loggeduser = useSelector((state) => state.auth.userAuth)
    const onSearch = (value) => {
        setUservalue(value)
    };
    const dispatch = useDispatch()
    useEffect(() => {
        const setdata = async () => {
            const data = await getDocs(collection(db, "users"))
            const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setoptiondata([])
            users.map((user) => { if (loggeduser.userId != user.userId) setoptiondata(p => [...p, { value: user.userId, label: user.name }]) })
        }
        setdata()
    }, [])
    const saveChatid = async (chatroomid) => {
        await addDoc(collection(db, "chatRooms"), {
            chatRoomId: chatroomid,
            messages: [],
            sender: loggeduser.userId,
            receiver: uservalue
        })
    }
    const handleStartChat = async () => {
        if (uservalue) {
            console.log("working")
            const chatroomid = (uservalue < (loggeduser.userId)) ? ("" + uservalue + (loggeduser.userId)) : ("" + (loggeduser.userId) + uservalue)
            dispatch(setchatroomid(chatroomid))
            const chatid = await getDocs(collection(db, "chatRooms"))
            setUservalue()
            const getchatid = chatid?.docs.filter((id) => id.data().chatRoomId == chatroomid)
            if (getchatid.length == 0) {
                saveChatid(chatroomid)
            }
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
        <button onClick={handleStartChat} style={{ backgroundColor: "#2c3b44", color: "#1EBEA5", border: "0" }}>Start</button>
    </>)
}
export default Search
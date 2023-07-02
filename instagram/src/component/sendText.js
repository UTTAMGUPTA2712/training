import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import InputEmoji from "react-input-emoji";
import { db } from "../utils/firebase";
import { useSelector } from "react-redux";

const SendText = () => {
  const [text, setText] = useState("");
  const currentChatRoom = useSelector((state) => state.auth.currentChatRoom);
  const currentUser = useSelector((state) => state.auth.authDetail?.userId)
  const handleOnEnter = async () => {
    const dateTime=new Date()
    const data = {
      sender: currentUser,
      chat: text,
      time: dateTime.toLocaleTimeString(),
      date:dateTime.toLocaleDateString(),
    }
    console.log(data)
    await updateDoc(doc(db, "ChatRooms", currentChatRoom), {
      latest: text,
      lastUpdate:dateTime,
      messages:arrayUnion(data)
    })
  }
  const SetTyping = async (e) => {
    try {
      setText(e)
      await updateDoc(doc(db, "Users", currentUser), {
        typing: { [currentChatRoom]: true }
      })
      let clear;
      clearTimeout(clear)
      clear = setTimeout(async () => {
        await updateDoc(doc(db, "Users", currentUser), {
          typing: { [currentChatRoom]: false }
        })
      }, 1000);
    } catch (err) { console.log(err) }
  }
  return (
    <div id="textSender">
    <InputEmoji
      value={text}
      onChange={(e) => SetTyping(e)}
      cleanOnEnter
      onEnter={handleOnEnter}
      placeholder="Type a message"
    />
    </div>
  )
}
export default SendText
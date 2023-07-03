import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import InputEmoji from "react-input-emoji";
import { db } from "../utils/firebase";
import { useSelector } from "react-redux";

// to send text in a chatroom
const SendText = () => {
  // initialize text and get chatroom and logged user detail
  const [text, setText] = useState("");
  const currentChatRoom = useSelector((state) => state.auth.currentChatRoom);
  const currentUser = useSelector((state) => state.auth.authDetail?.userId);
  // send text on enter
  const handleOnEnter = async () => {
    // setting text data
    const dateTime=new Date()
    const data = {
      sender: currentUser,
      chat: text,
      time: dateTime.toLocaleTimeString(),
      date:dateTime.toLocaleDateString(),
    }
    // updating the chat in chatrrom with dta
    await updateDoc(doc(db, "ChatRooms", currentChatRoom), {
      latest: text,
      lastUpdate:dateTime,
      messages:arrayUnion(data)
    })
  }
  // to set show typing part and stopping it with debouncing
  const SetTyping = async (e) => {
    try {
      setText(e)
      // setting typing
      await updateDoc(doc(db, "Users", currentUser), {
        typing: { [currentChatRoom]: true }
      })
      let clear;
      clearTimeout(clear)
      clear = setTimeout(async () => {
        // removing typing
        await updateDoc(doc(db, "Users", currentUser), {
          typing: { [currentChatRoom]: false }
        })
      }, 1000);
    } catch (err) { console.log(err) }
  }
  return (
    <div id="textSender">
      {/* input field with emoji feature */}
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
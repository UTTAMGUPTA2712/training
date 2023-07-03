import React from 'react'
// display logic of a chat message
const ChatCard = ({ data, user }) => {
  return (
    // check if the message sender is logged user or not then set the css accordingly
    <div className={data?.sender == user ? "senderchat" : "recieverchat"}>
    <div>{data?.chat}</div><span>{data?.time}</span>
</div>
  )
}

export default ChatCard
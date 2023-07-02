import React from 'react'

const ChatCard = ({ data, user }) => {
  return (
    <div className={data?.sender == user ? "senderchat" : "recieverchat"}>
    <div>{data?.chat}</div><span>{data?.time}</span>
</div>
  )
}

export default ChatCard
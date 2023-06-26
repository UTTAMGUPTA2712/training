import { useEffect, useState } from "react";
import ChatsCard from "./chatsCard"
import smileicon from "../assets/images/smile.png"
import micicon from "../assets/images/mic.png"
import searchicon from "../assets/images/search.png"
import phoneicon from "../assets/images/phone.png"
import avataricon from "../assets/images/avatar.png"
const Chats = ({ data }) => {
    const user = "uttam"
    // [{}]
    console.log("working")
    const chats = [
        {
            sender: 'uttam',
            chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",

            time: '10:00 AM'
        },
        {
            sender: 'satyam',
            chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",

            time: '10:05 AM'
        },
        {
            sender: 'uttam',
            chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",

            time: '10:10 AM'
        },
        {
            sender: 'satyam',
            chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",

            time: '10:15 AM'
        },
        {
            sender: 'uttam',
            chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",

            time: '10:20 AM'
        },
        {
            sender: 'satyam',
            chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",

            time: '10:25 AM'
        },
        {
            sender: 'uttam',
            chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",

            time: '10:30 AM'
        },
        {
            sender: 'satyam',
            chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
            time: '10:35 AM'
        }, {
            sender: 'uttam',
            chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
            time: '10:20 AM'
        },
        {
            sender: 'satyam',
            chat: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
            time: '10:25 AM'
        },
        {
            sender: 'uttam',
            chat: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
            time: '10:30 AM'
        },
        {
            sender: 'satyam',
            chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
            time: '10:35 AM'
        },
    ];
    let date;
    useEffect(() => {
        const target = document.querySelector("#chatbox");
        target.scroll({ top: target.scrollHeight, behavior: "smooth" })
    }, [])
    return (<>
        <div id="userdetail"><img className="avatar" src={avataricon} /><h2>UserName</h2><span><img src={phoneicon} /><img src={searchicon} /></span></div>
        <div id="chatbox">
            {chats.map((chat) => {
                return <>{(date != (chat?.time)) ? (<span className="chatdate">{date = chat?.time}</span>) : ""}<ChatsCard data={chat} user={user} /></>
            })}
        </div>
        <div id="typechat"><img src={smileicon} /><input type="textarea" placeholder="Type a message"></input><img src={micicon} /></div>
    </>)
}
export default Chats
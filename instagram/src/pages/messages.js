import { useSelector } from "react-redux"
import ChatList from "../component/chatlist"
import ChatRoom from "../component/chatroom"
import SendText from "../component/sendText"
import Sidebar from "../component/sidebar"
import UserList from "../component/userlist"

const Messages = () => {
    const currentChatRoom=useSelector(state=>state.auth.currentChatRoom)
    return (<>

        <div id="grid">
            <Sidebar />
            <div id="chat">
                <div id="users">
                    <UserList />
                    <ChatList />
                </div>
                <div id="chatRoom">
                    {currentChatRoom?
                    <>
                    <ChatRoom />
                    <SendText />
                    </>
                    :
                    <div id="nomessage"/>}
                </div>
            </div>
        </div>
    </>)
}
export default Messages
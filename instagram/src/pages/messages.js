import { useSelector } from "react-redux"
import ChatList from "../component/chatlist"
import ChatRoom from "../component/chatroom"
import SendText from "../component/sendText"
import Sidebar from "../component/sidebar"
import UserList from "../component/userlist"

const Messages = () => {
    // getting current chatroom
    const currentChatRoom = useSelector(state => state.auth.currentChatRoom)
    return (<>
        <div id="grid">
            <Sidebar />
            <div id="chat">
                {/* list of users and onging chatroom */}
                <div id="users">
                    <UserList />
                    <ChatList />
                </div>
                <div id="chatRoom">
                    {/* if any chatroom selected show the chatroom else blank image*/}
                    {currentChatRoom ?
                        <>
                            <ChatRoom />
                            <SendText />
                        </>
                        :
                        <div id="nomessage" />}
                </div>
            </div>
        </div>
    </>)
}
export default Messages
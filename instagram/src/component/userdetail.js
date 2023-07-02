import React from 'react'
import Sidebar from './sidebar'
import Posts from './posts'
import { useLocation } from 'react-router-dom'

const UserDetail = ({userData}) => {
    const location=useLocation()
    userData=(location.state)??userData
  return (
    <div id="grid">
    <Sidebar />
    <div id="profile">
        <div id="userdetail">
            <img src={userData?.photo}  alt='user'/>
            <span>
                <h1>{userData?.username}</h1>
                <h3>{userData?.email}</h3>
            </span>
        </div>
        <div id='table'>Post</div>
        <div id="userpost">
            <Posts user={userData?.userId} />
        </div>
    </div>
</div>
  )
}

export default UserDetail
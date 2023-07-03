import React from 'react'
import Sidebar from './sidebar'
import Posts from './posts'
import { useLocation } from 'react-router-dom'

// show the detail of the user whose data has been shared
const UserDetail = ({ userData }) => {
    // checking if the user has moved to this page using profile router or userDetail router hence setting up user detail
    const location = useLocation()
    userData = (location.state) ?? userData
    return (
        <div id="grid">
            <Sidebar />
            <div id="profile">
                <div id="userdetail">
                    {/* user data */}
                    <img src={userData?.photo} alt='user' />
                    <span>
                        <h1>{userData?.username}</h1>
                        <h3>{userData?.email}</h3>
                    </span>
                </div>
                <div id='table'>Post</div>
                <div id="userpost">
                    {/* sending user id to get the user post */}
                    <Posts user={userData?.userId} />
                </div>
            </div>
        </div>
    )
}

export default UserDetail
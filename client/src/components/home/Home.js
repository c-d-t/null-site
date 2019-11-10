import React from 'react'
import { FaUser, FaDiceFive, FaUserFriends, FaBook } from 'react-icons/fa'

import Category from './category/Category'
import './Home.css'

class Home extends React.Component {
    render() {
        return (
            <div id="category-container" className="container">
                <Category
                    name="Account"
                    description="Settings"
                    icon={<FaUser className="category-icon"/>}
                    url="/account"
                />
                <Category
                    name="Random Chat"
                    description="Talk to strangers"
                    icon={<FaDiceFive className="category-icon"/>}
                    url="/random"
                />
                <Category
                    name="Group Chat"
                    description="Join the discussion"
                    icon={<FaUserFriends className="category-icon"/>}
                    url="group"
                />
                <Category
                    name="Forums"
                    description="Share whats on your mind"
                    icon={<FaBook className="category-icon"/>}
                    url=""
                    disabled={true}
                />
            </div>
        )
    }
}

export default Home
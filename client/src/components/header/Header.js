import React from 'react'
import { Link } from 'react-router-dom'

import { FaUser } from 'react-icons/fa'

import './Header.css'

function Header() {
    return (
        <header>
            <Link to="/" id="header-logo">null<span>SITE</span></Link>
            <ul id="header-items">
                <li><FaUser /> Account</li>
            </ul>
        </header>
    )
}

export default Header
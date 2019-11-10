import React from 'react'
import { Link } from 'react-router-dom'

import { FaGithub } from 'react-icons/fa'

import './Header.css'

function Header() {
    return (
        <header>
            <Link to="/" id="header-logo">null<span>SITE</span></Link>
            <ul id="header-items">
                <a href="https://github.com/CoherentNonsense/null-site"><li><FaGithub /> Github</li></a>
            </ul>
        </header>
    )
}

export default Header
import React from 'react'
import '../style/Navbar.css'
import { removeToken } from '../UseToken'

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light" onClick={() => removeToken()}>
        <a class="navbar-brand custom-navbar-logoutbutton" href="#">Wyloguj</a>
        </nav>
    )
}

export default Navbar

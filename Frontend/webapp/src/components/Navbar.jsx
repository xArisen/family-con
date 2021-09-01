import React from 'react'
import '../style/Navbar.css'
import { removeToken } from '../UseToken'

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" onClick={() => removeToken()}>
        <i class="fa-solid fa-right-from-bracket">Logout</i>
        </button>
        </nav>
    )
}

export default Navbar

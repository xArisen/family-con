import React from 'react'
import Navbar from './Navbar'
import Content from './Content'
import Footer from './Footer'
import '../style/MainPage.css'

function MainPage() {
    return (
        <div className="custom-mainpage-container">
            <Navbar />
            <Content />
            <Footer />
        </div>
    )
}

export default MainPage

import React from 'react'
import CustomCalendar from './CustomCalendar'
import '../style/Content.css'
import CalendarGetter from './CalendarGetter'

function Content() {
    return (
        <div className="custom-content-container">
            <CalendarGetter/>
            <CustomCalendar />
        </div>
    )
}

export default Content

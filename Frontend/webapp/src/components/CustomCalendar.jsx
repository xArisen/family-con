import React from 'react'
import Calendar from 'react-calendar'
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../style/CustomCalendar.css'

function CustomCalendar() {
    const [value, onChange] = useState(new Date());
    return (
        <div className="custom-calendar-container">
            <Calendar
            onChange={onChange}
            value={value}
            className="custom-calendar"
            />
        </div>
    )
}

export default CustomCalendar

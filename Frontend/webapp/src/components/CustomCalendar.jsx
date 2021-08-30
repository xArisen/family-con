import React from 'react'
import Calendar from 'react-calendar'
import { useState } from 'react';

function CustomCalendar() {
    const [value, onChange] = useState(new Date());
    return (
        <Calendar/>
    )
}

export default CustomCalendar

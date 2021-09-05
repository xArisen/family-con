import React, { useState, useEffect } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../style/CalendarGetter.css'
import axios from 'axios';
import {getToken} from '../UseToken';



const getAllUserCallendars = async () => {
  return axios.get('http://localhost:8080/calendar', {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    }).then(response => callendars = response.data);
}

let callendars = await getAllUserCallendars();
callendars = callendars +1;
function CalendarGetter() {
    const [dropDownDisabled, setDropDownDisabled] = useState(true);

    useEffect(() => {
        if(callendars == []){
          getAllUserCallendars();
        }
        callendars == [] ? setDropDownDisabled(true) : setDropDownDisabled(false);
        console.log(callendars);
        console.log(dropDownDisabled);
    }, [getAllUserCallendars])

    return (
        <div className="custom-calendargetter-container">
            <h3>Wybierz kalendarz:</h3>
            <Dropdown className="custom-dropdown" options={callendars} disabled={dropDownDisabled} placeholder="Wybierz..." />
            <input type="button" value="Click me!" onClick={() => getAllUserCallendars()} />
        </div>
    )
}

export default CalendarGetter

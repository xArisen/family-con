import React, { useState, useEffect } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../style/CalendarGetter.css'
import {getToken, removeToken} from '../UseToken';




class CalendarGetter extends React.Component {
  state = {
    loading: true,
    allCalendars: []
  };

  getAllCalendarsData = async () => {
    const url = 'http://localhost:8080/calendar';
    const response = await fetch(url, { 
        method: 'GET', 
        headers: new Headers({
          'Authorization': `Bearer ${getToken()}`
        })});
    if(response.status == 403){
      removeToken();
    }
    const data = await response.json();
    this.setState({allCalendars: data})
    console.log(data);
  }

  createCalendar = async () => {
    const url = 'http://localhost:8080/calendar';
    const response = await fetch(url, { 
        method: 'POST', 
        body: JSON.stringify({
          name: "praca"
        }),
        headers: new Headers({
          'Authorization': `Bearer ${getToken()}`,
          "Content-type": "application/json; charset=UTF-8"
        })});
        
        if(response.status == 403){
          removeToken();
        }
    const data = await response.json();
    console.log(data);
  }

    render() { 
      return (
        <div className="custom-calendargetter-container">
            <h3>Wybierz kalendarz:</h3>
            <Dropdown className="custom-dropdown" options={this.state.allCalendars.map(calendar => calendar.name)} placeholder="Wybierz..." />
            <input type="button" value="Get calendars" onClick={this.getAllCalendarsData} />
            <input type="button" value="Add calendar" onClick={this.createCalendar} />
        </div>
      )}
}

export default CalendarGetter

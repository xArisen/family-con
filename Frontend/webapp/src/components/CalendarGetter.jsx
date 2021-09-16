import React, { useState, useEffect } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../style/CalendarGetter.css'
import {getToken, removeToken} from '../UseToken';




class CalendarGetter extends React.Component {
  state = {
    loading: true,
    allCalendars: [],
    showAddCalendar: false
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
  }

  createCalendar = async (calendarName) => {
    const url = 'http://localhost:8080/calendar';
    const response = await fetch(url, { 
        method: 'POST', 
        body: JSON.stringify({
          name: calendarName
        }),
        headers: new Headers({
          'Authorization': `Bearer ${getToken()}`,
          "Content-type": "application/json; charset=UTF-8"
        })});
        
        if(response.status == 403){
          removeToken();
        }else if(response.status == 200){
          this.getAllCalendarsData();
        }
    const data = await response.json();
  }

  componentDidMount(){
    this.getAllCalendarsData();           
  } 
    render() {
      return (
        <>
        <div className="custom-calendargetter-container">
            <h3 className="custom-dropdown-choosecalendar-name">Wybierz kalendarz:</h3>
            <Dropdown className="custom-dropdown-choosecalendar" options={this.state.allCalendars.map(calendar => calendar.name)} placeholder="Wybierz..." />
            <input type="button" value="Dodaj kalendarz" onClick={() => this.setState({ showAddCalendar: !this.state.showAddCalendar})} />
            <h1>{this.state.showAddCalendar}</h1>
        </div>
        {this.state.showAddCalendar && <div className="custom-addcalendar-container">
          <div className="custom-addcalendar-inputcontainer">
            <p className="custom-addcalendar-inputname">Nazwa</p>
            <input type="text" id="addcalendar-inputfield" className="custom-addcalendar-inputfield"></input>
            <input type="button" value="Stwórz" className="custom-addcalendar-submitbutton" onClick={() => this.createCalendar(document.getElementById('addcalendar-inputfield').value)}/>
          </div>
        </div>}
        </>
      )}
}

export default CalendarGetter

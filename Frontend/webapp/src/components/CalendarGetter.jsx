import React, { useState, useEffect } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../style/CalendarGetter.css'
import {getToken, removeToken} from '../UseToken';




class CalendarGetter extends React.Component {
  state = {
    loading: true,
    allCalendars: [],
    selectedCalendar: '',
    calendar: '',
    showAddCalendar: false,
    addCalendarResponse: '',
    addCalendarResponseClassName: ''
  };

  handleDropdownChange = (option) => {
    this.getCalendar(this.state.allCalendars.find(calendar => calendar.name == option.value).id);
    console.log(this.state.calendar);
  }

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

  getCalendar = async (id) => {
    const url = `http://localhost:8080/calendar/${id}`;
    const response = await fetch(url, { 
        method: 'GET', 
        headers: new Headers({
          'Authorization': `Bearer ${getToken()}`
        })});
    if(response.status == 403){
      removeToken();
    }
    const data = await response.json();
    console.log(data);
    this.setState({calendar: data})
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
        const data = await response.json();
        document.getElementById('addcalendar-inputfield').value = "";
        if(response.status == 403){
          removeToken();
        }else if(response.status == 200){
          this.getAllCalendarsData();
          this.setState({addCalendarResponseClassName: "custom-addcalendar-response-success"});
          this.setState({addCalendarResponse: "Stworzono nowy kalendarz"});
        }else if(response.status == 400){
          this.setState({addCalendarResponseClassName: "custom-addcalendar-response-wrong"});
          this.setState({addCalendarResponse: data.message});
        }
  }

  componentDidMount(){
    this.getAllCalendarsData();           
  } 
    render() {
      return (
        <>
        <div className="custom-calendargetter-container">
            <h3 className="custom-dropdown-choosecalendar-name">Wybierz kalendarz:</h3>
            <Dropdown id="calendar-select-dropdown" className="custom-dropdown-choosecalendar" options={this.state.allCalendars.map(calendar => calendar.name)} placeholder="Wybierz..." onChange={(option) => this.handleDropdownChange(option)} />
            <input type="button" value="Dodaj kalendarz" onClick={() => this.setState({ showAddCalendar: !this.state.showAddCalendar, addCalendarResponse: ''})} />
            <h1>{this.state.showAddCalendar}</h1>
        </div>
        {this.state.showAddCalendar && <div className="custom-addcalendar-container">
          <div className="custom-addcalendar-inputcontainer">
            <p className="custom-addcalendar-inputname">Nazwa</p>
            <input type="text" id="addcalendar-inputfield" className="custom-addcalendar-inputfield"></input>
            <input type="button" value="Stwórz" className="custom-addcalendar-submitbutton" onClick={() => this.createCalendar(document.getElementById('addcalendar-inputfield').value)}/>
            <h6 className={this.state.addCalendarResponseClassName}>{this.state.addCalendarResponse}</h6>
          </div>
        </div>}
        </>
      )}
}

export default CalendarGetter

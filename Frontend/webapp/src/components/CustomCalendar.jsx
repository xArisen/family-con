import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../style/CustomCalendar.css'
import EventController from './EventController';

class CustomCalendar extends React.Component {

    state = {
        initialDate: new Date(),
        allEvents: [],
        choosenDayEvents: []
    }

    componentDidUpdate(){
        this.state.allEvents = [];
        if(this.state.allEvents){
            for(let i=0; i<this.props.calendarData.events.length; i++){
                this.state.allEvents.push(this.props.calendarData.events[i]);
            }
        }
    } 

    onClickDayHandle = (value) => {
        console.log(this.state.allEvents.map(event => new Date(event.date)));
        const valueDate = new Date(value);
        const valueDatePlusOneDay = new Date(valueDate.setDate(valueDate.getDate()+1));
        const date = new Date(valueDatePlusOneDay).toISOString().substr(0,value.toISOString().indexOf("."));
        const dateString = date.toString().substr(0, 10);
        const events = this.getAllEventsAtDay(dateString);
        this.setState({choosenDayEvents: events});
    }

    getAllEventsAtDay = (date) => {
        return this.state.allEvents.filter(event => event.date.substr(0, 10) == date)
    }

    render() {
    return (
        <div className="custom-calendar-container">
            <Calendar
            defaultActiveStartDate={this.state.initialDate}
            className="custom-calendar"
            onClickDay={(value) => this.onClickDayHandle(value)}
            value={this.state.allEvents.map(event => new Date(event.date))}
            />
            <EventController choosenDayEvents={this.state.choosenDayEvents} calendarId={this.props.calendarData.id}/>
        </div>
    )
    }
}

export default CustomCalendar

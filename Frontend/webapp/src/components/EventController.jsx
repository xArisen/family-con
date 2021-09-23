import React from 'react'
import '../style/EventController.css'
import { getToken, removeToken } from '../UseToken';

class EventController extends React.Component {
    state = {
        choosenDayEventsTitles: [],
        choosenEvent: null,
        updateCalendarResponse: '',
        updateCalendarResponseClassName: ''
    }

    componentDidUpdate(){
        this.state.choosenDayEventsTitles = this.props.choosenDayEvents.map(event => event.title);
        console.log(this.state.choosenDayEventsTitles);
    }

    updateEvent = async (id, title, description, date) => {
        const url = 'http://localhost:8080/event/'+id;
        if(id == null){
            this.setState({addCalendarResponseClassName: "custom-updateEvent-response-wrong"});
            this.setState({addCalendarResponse: "Wybierz kalendarz, który chcesz zaktualizować"});
        }
        else if(title == null || description == null || date == null){
            this.setState({addCalendarResponseClassName: "custom-updateEvent-response-wrong"});
            this.setState({addCalendarResponse: "Uzupełnij wszystkie dane wymagane do aktualizacji"});
        }
        else{
            const response = await fetch(url, { 
                method: 'POST', 
                body: JSON.stringify({
                  title: title,
                  description: description,
                  date: date
                }),
                headers: new Headers({
                  'Authorization': `Bearer ${getToken()}`,
                  "Content-type": "application/json; charset=UTF-8"
                })});
                const data = await response.json();
                if(response.status == 403){
                  removeToken();
                }else if(response.status == 200){
                  this.setState({updateCalendarResponseClassName: "custom-updateEvent-response-success"});
                  this.setState({updateCalendarResponse: "Uaktualniono wydarzenie!\n Wybierz ponownie kalendarz, by go zaktualizować!"});
                  document.getElementById("custom-updateEvent-title-inputfield").value ="";
                  document.getElementById("custom-updateEvent-description-inputfield").value ="";
                  document.getElementById("custom-updateEvent-datetime-inputfield").value ="";
                  this.setState({choosenEvent: null});

                }else if(response.status == 400){
                  this.setState({addCalendarResponseClassName: "custom-updateEvent-response-wrong"});
                  this.setState({addCalendarResponse: "Błąd aktualizacji"});
                }
        }

      }

    render(){
        return (
            <div className="custom-event-container">
                <div className="custom-event-display-container">
                    <div className="custom-event-detail-container-positioning">
                        <h3>Wydarzenia:</h3>
                        {this.props.choosenDayEvents.length > 0 && 
                        this.props.choosenDayEvents.map(event => <input value={event.title} key={event.id} type="button"
                        onClick={() => {this.state.choosenEvent = event; console.log(event); document.getElementById("custom-updateEvent-title-inputfield").value = event.title;
                        document.getElementById("custom-updateEvent-description-inputfield").value = event.description;
                        document.getElementById("custom-updateEvent-datetime-inputfield").value = event.date; }}></input>)}
                    </div>
                </div>
                <div></div>
                <div className="custom-event-detail-container">
                        <br/>
                        <h3>Sczegóły:</h3>
                        <p className="custom-updateEvent-inputname">Tytuł</p>
                        <input type="text" className="custom-updateEvent-inputfield" id="custom-updateEvent-title-inputfield"></input>
                        <p className="custom-updateEvent-inputname">Opis</p>
                        <textarea className="custom-updateEvent-inputfield" id="custom-updateEvent-description-inputfield"></textarea>
                        <p className="custom-updateEvent-inputname">Data</p>
                        <input type="datetime-local" className="custom-updateEvent-inputfield" id="custom-updateEvent-datetime-inputfield"/>
                        <input type="button" value="Edytuj" className="custom-updateEvent-submitbutton" onClick={() => this.updateEvent(this.state.choosenEvent?.id ?? null, document.getElementById("custom-updateEvent-title-inputfield").value ?? null, 
                        document.getElementById("custom-updateEvent-description-inputfield").value ?? null, document.getElementById("custom-updateEvent-datetime-inputfield").value ?? null)}/>
                        <h6 className={this.state.updateCalendarResponseClassName}>{this.state.updateCalendarResponse}</h6>
                        {!this.state.choosenEvent &&<h6 >Wybierz wydarzenie</h6>}
                </div>
            </div>
        )
    }
}

export default EventController

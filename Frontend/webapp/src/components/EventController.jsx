import React from 'react'
import '../style/EventController.css'
import { getToken, removeToken } from '../UseToken';

class EventController extends React.Component {
    state = {
        choosenDayEventsTitles: [],
        choosenEvent: null,
        updateEventResponse: '',
        updateEventResponseClassName: '',
        createEventResponse: '',
        createEventResponseClassName: '',
        calendarId: null
    }

    componentDidUpdate(){
        this.state.choosenDayEventsTitles = this.props.choosenDayEvents.map(event => event.title);
        this.state.calendarId = this.props.calendarId;
        console.log(this.state.choosenDayEventsTitles);
        console.log(this.props.calendarId);
    }

    
    addEvent = async (title, description, date) => {
      console.log(title, description, date, this.state.calendarId);
      const url = 'http://localhost:8080/calendar/'+this.state.calendarId+'/event';
      if(title == null || description == null || date == null){
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
              if(response.status == 403){
                removeToken();
              }else if(response.status == 200){
                this.setState({createEventResponseClassName: "custom-addEvent-response-success"});
                this.setState({createEventResponse: "Dodano wydarzenie!\n Wybierz ponownie kalendarz, by go zaktualizować!"});
                document.getElementById("custom-addEvent-title-inputfield").value ="";
                document.getElementById("custom-addEvent-description-inputfield").value ="";
                document.getElementById("custom-addEvent-datetime-inputfield").value ="";

              }else if(response.status == 400 || response.status == 500){
                this.setState({createEventResponseClassName: "custom-addEvent-response-wrong"});
                this.setState({createEventResponse: "Błąd dodawania wydarzenia"});
              }
      }

    }


    updateEvent = async (id, title, description, date) => {
        const url = 'http://localhost:8080/event/'+id;
        if(id == null){
            this.setState({addCalendarResponseClassName: "custom-updateEvent-response-wrong"});
            this.setState({addCalendarResponse: "Wybierz wydarzenie, które chcesz zaktualizować"});
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
                if(response.status == 403){
                  removeToken();
                }else if(response.status == 200){
                  this.setState({updateEventResponseClassName: "custom-updateEvent-response-success"});
                  this.setState({updateEventResponse: "Uaktualniono wydarzenie!\n Wybierz ponownie kalendarz, by go zaktualizować!"});
                  document.getElementById("custom-updateEvent-title-inputfield").value ="";
                  document.getElementById("custom-updateEvent-description-inputfield").value ="";
                  document.getElementById("custom-updateEvent-datetime-inputfield").value ="";
                  this.setState({choosenEvent: null});

                }else if(response.status == 400){
                  this.setState({updateEventResponseClassName: "custom-updateEvent-response-wrong"});
                  this.setState({updateEventResponse: "Błąd aktualizacji"});
                }
        }
      }

      deleteEvent = async (id) => {
        const url = 'http://localhost:8080/event/delete/'+id;
        if(id == null){
          this.setState({updateEventResponseClassName: "custom-updateEvent-response-wrong"});
          this.setState({updateEventResponse: "Wybierz wydarzenie, które chcesz usunąć"});
        }
        else{
            const response = await fetch(url, { 
                method: 'POST',
                headers: new Headers({
                  'Authorization': `Bearer ${getToken()}`,
                  "Content-type": "application/json; charset=UTF-8"
                })});
                if(response.status == 403){
                  removeToken();
                }else if(response.status == 200){
                  this.setState({updateEventResponseClassName: "custom-updateEvent-response-success"});
                  this.setState({updateEventResponse: "Usunięto wydarzenie!\n Wybierz ponownie kalendarz, by go zaktualizować!"});
                  document.getElementById("custom-updateEvent-title-inputfield").value ="";
                  document.getElementById("custom-updateEvent-description-inputfield").value ="";
                  document.getElementById("custom-updateEvent-datetime-inputfield").value ="";
  
                }else if(response.status == 400 || response.status == 500){
                  this.setState({updateEventResponseClassName: "custom-updateEvent-response-wrong"});
                  this.setState({updateEventResponse: "Błąd usuwania wydarzenia"});
                }
        }
  
      }

    render(){
        return (<>
          <div className="custom-event-add-container">
            <div>
              <div className="custom-addEvent-input-and-title">
                <p className="custom-addEvent-inputname">Tytuł</p>
                <input type="text" className="custom-addEvent-inputfield" id="custom-addEvent-title-inputfield"></input>
              </div>
              <div className="custom-addEvent-input-and-title">
                <p className="custom-addEvent-inputname">Data</p>
                <input type="datetime-local" className="custom-addEvent-inputfield" id="custom-addEvent-datetime-inputfield"/>
              </div>
            </div>
            <div className="custom-addEvent-input-and-title-description">
              <p className="custom-addEvent-inputname">Opis</p>
              <textarea className="custom-addEvent-inputfield" id="custom-addEvent-description-inputfield"></textarea>
            </div>
            <div>
              <input type="button" value="Dodaj wydarzenie" className="custom-addEvent-submitbutton" onClick={() => this.addEvent(document.getElementById("custom-addEvent-title-inputfield").value ?? null, 
                          document.getElementById("custom-addEvent-description-inputfield").value ?? null, document.getElementById("custom-addEvent-datetime-inputfield").value)}/>
              <h7 className={this.state.createEventResponseClassName}>{this.state.createEventResponse}</h7>
            </div>
          </div>
            <div className="custom-event-container">
                <div className="custom-event-display-container">
                    <div className="custom-event-detail-container-positioning">
                        <h3>Wydarzenia:</h3>
                        {this.props.choosenDayEvents.length > 0 && 
                        this.props.choosenDayEvents.map(event => <input className="custom-event-select-button" value={event.title} key={event.id} type="button"
                        onClick={() => {this.state.choosenEvent = event; document.getElementById("custom-updateEvent-title-inputfield").value = event.title;
                        document.getElementById("custom-updateEvent-description-inputfield").value = event.description;
                        document.getElementById("custom-updateEvent-datetime-inputfield").value = event.date; }}></input>)}
                    </div>
                </div>
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
                        <input type="button" value="Usuń" className="custom-updateEvent-submitbutton" onClick={() => this.deleteEvent(this.state.choosenEvent?.id ?? null)}/>
                        <h6 className={this.state.updateEventResponseClassName}>{this.state.updateEventResponse}</h6>
                        {!this.state.choosenEvent && <h6 >Wybierz wydarzenie</h6>}
                </div>
            </div>
            </>
        )
    }
}

export default EventController

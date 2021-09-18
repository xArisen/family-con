import React from 'react';
import '../style/Login.css';
import {saveToken} from '../UseToken';

export default class Login extends React.Component {
    state = {
        name: "",
        password: "",
        response: ""
    }

    
    login = async (name, password) => {
        const url = 'http://localhost:8080/user/login';
        var data = JSON.stringify({ "name": name, "password": password });
        const response = await fetch(url, { 
            method: 'POST', 
            headers: new Headers({
                "Content-type": "application/json; charset=UTF-8"
            }),
            body: data
        });
        const responseData = await response.json();
        saveToken(responseData);
        if(responseData == ""){
            this.setState({response: "Błąd logowania"});
        }

        document.getElementById("nameInput").value = "";
        document.getElementById("passwordInput").value = "";
      }

    render(){
    return (
        <div className="register-wrapper">
            <h1>Witamy!</h1>
            <div className="custom-register-inputbox">
                <p>Nazwa</p>
                <input type="text" id="nameInput"/>
            </div>
            <div className="custom-register-inputbox">
                <p>Hasło</p>
                <input type="password" id="passwordInput"/>
            </div>
                <button className="custom-register-submitbutton" type="submit" onClick={() => this.login(document.getElementById("nameInput").value, document.getElementById("passwordInput").value)}>Wyślij</button>
                <h6 className="custom-register-response-wrong">{this.state.response}</h6>
        </div>
    )}
}
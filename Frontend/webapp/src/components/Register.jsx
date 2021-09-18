import React from 'react';
import '../style/Login.css';


async function registerUser(credentials) {
    return fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}


export default class Register extends React.Component {
    state = {
        name: "",
        password: "",
        response: "",
        responseClassName: ""
    };

    register = async (name, password) => {
        const url = 'http://localhost:8080/user/register';
        var data = JSON.stringify({ "name": name, "password": password });
        const response = await fetch(url, { 
            method: 'POST', 
            headers: new Headers({
                "Content-type": "application/json; charset=UTF-8"
            }),
            body: data
        });
        
        const status = await response.status;
        if(status == 400) {
            this.setState({response: "Błąd rejestracji"});
            this.setState({responseClassName: "custom-register-response-wrong"});
        }else if(status == 200){
            this.setState({response: "Poprawnie zarejestrowano konto"});
            this.setState({responseClassName: "custom-register-response-correct"});
        }

        document.getElementById("nameInput").value = "";
        document.getElementById("passwordInput").value = "";
      }
    


render() {
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
                <button className="custom-register-submitbutton" type="submit" onClick={() => this.register(document.getElementById("nameInput").value, document.getElementById("passwordInput").value)}>Wyślij</button>
                <h6 className={this.state.responseClassName}>{this.state.response}</h6>
        </div>
    )
    }
}
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../style/Login.css';


async function loginUser(credentials) {
    return fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error)
        })
}


export default function Login({ setToken }) {
    const [name, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            name,
            password
        });
        console.log(token);
        setToken(token);
    }


    return (
        <div className="login-wrapper">
            <h1>Wpisz dane</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <br />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
import React, { useState } from 'react';
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


export default function Register() {
    const [name, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        await registerUser({
            name,
            password
        });
    }


    return (
        <div className="login-wrapper">
            <h1>Witamy!</h1>
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
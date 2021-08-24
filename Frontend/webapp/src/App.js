import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import useToken from './UseToken';
import Logreg from './components/Logreg';
import './style/Logreg.css'

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <div className="custom-tabs">
      <Logreg setToken={setToken}/>
      </div>
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

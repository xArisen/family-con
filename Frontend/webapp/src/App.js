import React from 'react';
import './App.css';
import { getToken } from './UseToken';
import Logreg from './components/Logreg';
import './style/Logreg.css'
import CustomCalendar from './components/CustomCalendar';

function App() {
  if(!getToken()) {
    return <div className="custom-tabs">
      <Logreg/>
      </div>
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <CustomCalendar/>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { getToken } from './UseToken';
import Logreg from './components/Logreg';
import './style/Logreg.css'
import MainPage from './components/MainPage';

function App() {
  if(!getToken()) {
    return <div className="custom-tabs">
      <Logreg/>
      </div>
  }

  return (
    <div className="wrapper">
      <MainPage/>
    </div>
  );
}

export default App;

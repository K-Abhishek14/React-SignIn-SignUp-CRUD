import React from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Redirect to='/login' />   
  );
}

export default App;
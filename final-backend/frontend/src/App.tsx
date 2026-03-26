import React from 'react';
import './App.css';
import { useState } from "react";
import FirstPage from './firstPage';
import SecondPage from './secondPage';

type Pages = 'first' | 'second';

function App() {
  const [Page, setPage] = useState<Pages>('first');
  return (
    <div className="App">
      {Page === 'first' ? (
      <FirstPage onGo = {() => setPage('second')} /> 
      ):(
      <SecondPage onBack = {() => setPage('first')} />
      )} 
    </div>
  );
}

export default App;

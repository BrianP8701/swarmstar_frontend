import React, { useState, useContext } from 'react';
import Sidebar from './Sidebar';
import Main from './Main';
import HeaderBar from './HeaderBar';
import { GlobalContext } from './GlobalContext';

function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <HeaderBar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
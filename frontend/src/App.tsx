import React, { useState, useContext } from 'react';
import Sidebar from '@components/Sidebar';
import Main from '@components/MainArea';
import HeaderBar from '@components/HeaderBar';
import { GlobalContext } from './GlobalContext';

function App() {

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', position: 'fixed' }}>
      <div style={{ display: 'flex', height: '50px', width: 'calc(100vw - 40px)', backgroundColor: '#202123', position: 'fixed', marginLeft: '40px', zIndex: 1 }}>
        <HeaderBar />
      </div>
      <div style={{ display: 'flex', height: '100vh', width: '40px', backgroundColor: '#202123', position: 'fixed', zIndex: 1 }}>
        <Sidebar />
      </div>
      <div style={{ display: 'flex', height: 'calc(100vh - 50px)', width: 'calc(100vw-40px)', position: 'fixed', marginLeft: '40px', marginTop: '50px' }}>
        <Main />
      </div>
    </div>
  );
}

export default App;
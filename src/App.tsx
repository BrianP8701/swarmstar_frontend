import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Main from './Main';
import HeaderBar from './HeaderBar';

function App() {
  const [currentSection, setCurrentSection] = useState<string>("Spawn");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <HeaderBar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar setCurrentSection={setCurrentSection} />
        <Main currentSection={currentSection} />
      </div>
    </div>
  );
}

export default App;
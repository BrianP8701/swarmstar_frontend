import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Main from './Main';

function App() {
  const [currentSection, setCurrentSection] = useState<string>("");

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar setCurrentSection={setCurrentSection} />
      <Main currentSection={currentSection} />
    </div>
  );
}

export default App;
import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import Spawn from '../MainAreaSections/Spawn/index';
import ChatContainer from '../MainAreaSections/ChatContainer/index';

const Main = () => {
  const { currentSection } = useContext(GlobalContext);

    return (
      <div style={{ flex: 1, backgroundColor: '#343541', boxSizing: 'border-box', overflow: 'hidden', width: 'calc(100vw - 40px)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ height: '100%', width: '100%', boxSizing: 'border-box', padding: '5%' }}>
          {currentSection === 'Spawn' && <Spawn />}
          {currentSection === 'Chat' && <ChatContainer />}
        </div>
      </div>
    );
  };

export default Main;


// --gray-50: #f7f7f8;
// --gray-100: #ececf1;
// --gray-200: #d9d9e3;
// --gray-300: #c5c5d2;
// --gray-400: #acacbe;
// --gray-500: #999;
// --gray-600: #666;
// --gray-700: #40414f;
// --gray-800: #343541;
// --gray-900: #202123;
// --gray-950: #0f0f0f;
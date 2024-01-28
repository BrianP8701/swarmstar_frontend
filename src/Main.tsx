import React, { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import Spawn from './sections/Spawn/index';
import Chat from './sections/Chat/index';

const Main = () => {
  const { currentSection } = useContext(GlobalContext);

    return (
      <div style={{ flex: 1, height: 'calc(100vh - 50px)', marginTop: '50px', backgroundColor: '#242424', marginLeft: '40px', boxSizing: 'border-box', overflow: 'hidden' }}>
        <div style={{ margin: '15px', height: 'calc(100% - 2*15px)', width: 'calc(100% - 2*15px)', boxSizing: 'border-box', overflow: 'auto' }}>
          {currentSection === 'Spawn' && <Spawn />}
          {currentSection === 'Chat' && <Chat />}
        </div>
      </div>
    );
  };

export default Main;
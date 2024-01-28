import React, { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

type SidebarProps = {
  setCurrentSection: (section: string) => void;
};

const Sidebar = () => {
  const { setCurrentSection } = useContext(GlobalContext);

  return (
    <div style={{ width: '40px', height: '100vh', backgroundColor: '#000000', position: 'fixed', zIndex: 1 }}>
        <div style={{ width: '40px', height: '40px', marginTop: '10px', marginBottom: '30px', backgroundImage: 'url(' + process.env.PUBLIC_URL + '/icon.ico)', backgroundSize: 'cover' }}></div>
        <button style={{ width: '40px', height: '40px', padding: '0', border: 'none', backgroundImage: 'url(' + process.env.PUBLIC_URL + '/spawn_section.ico)', backgroundSize: 'cover' }} onClick={() => setCurrentSection('Spawn')}></button>
        <button style={{ width: '40px', height: '40px', padding: '0', border: 'none', backgroundImage: 'url(' + process.env.PUBLIC_URL + '/chat_section.ico)', backgroundSize: 'cover' }} onClick={() => setCurrentSection('Chat')}></button>
    </div>
  );
};

export default Sidebar;
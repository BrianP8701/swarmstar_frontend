import React from 'react';

type SidebarProps = {
  setCurrentSection: (section: string) => void;
};

const Sidebar = ({ setCurrentSection }: SidebarProps) => {
  return (
    <div style={{ width: '40px', height: '100vh', backgroundColor: '#000000', position: 'fixed' }}>
        <div style={{ width: '40px', height: '40px', marginTop: '10px', marginBottom: '30px', backgroundImage: 'url(' + process.env.PUBLIC_URL + '/icon.ico)', backgroundSize: 'cover' }}></div>
        <button style={{ width: '40px', height: '40px', padding: '0', border: 'none', backgroundImage: 'url(' + process.env.PUBLIC_URL + '/spawn_section.ico)', backgroundSize: 'cover' }} onClick={() => setCurrentSection('Section1')}></button>
        <button style={{ width: '40px', height: '40px', padding: '0', border: 'none', backgroundImage: 'url(' + process.env.PUBLIC_URL + '/chat_section.ico)', backgroundSize: 'cover' }} onClick={() => setCurrentSection('Section2')}></button>
        {/* Add more buttons for more sections */}
    </div>
  );
};

export default Sidebar;
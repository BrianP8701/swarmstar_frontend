import React from 'react';
import Spawn from './components/Spawn/index';
import Chat from './components/Chat/index';

interface MainProps {
    currentSection: string;
}
  
const Main = ({ currentSection }: MainProps) => {
return (
    <div style={{ flex: 1, height: '100vh', backgroundColor: '#242424', marginLeft: '40px' }}>
    {currentSection === 'Spawn' && <Spawn />}
    {currentSection === 'Chat' && <Chat />}
    {/* Add more conditions for more sections */}
    </div>
);
};

export default Main;
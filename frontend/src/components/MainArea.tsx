import { useContext } from 'react';
import { GlobalContext } from '@configs/GlobalContext';
import Spawn from '@components/Spawn';
import ChatContainer from '@components/ChatContainer';

const Main = () => {
  const { user } = useContext(GlobalContext);
  const currentSection = user.currentSection;


  return (
    <div style={{ flex: 1, backgroundColor: '#343541', boxSizing: 'border-box', overflow: 'hidden', width: 'calc(100vw - 40px)', height: 'calc(100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ height: '100%', width: '100%', boxSizing: 'border-box', padding: '1%' }}>
        {currentSection === 'Spawn' && <Spawn />}
        {currentSection === 'Chat' && <ChatContainer />}
      </div>
    </div>
  );
};

export default Main;



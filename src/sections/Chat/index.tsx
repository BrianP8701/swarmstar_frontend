import React, { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import AgentNavigation from './AgentNavigation';
import ChatSection from './ChatSection';

const Chat = () => {
  const context = useContext(GlobalContext);
  const { isRunning } = context;

  if (!isRunning) {
    return <div>No active swarm</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div style={{ flex: 0.1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <AgentNavigation />
      </div>
      <ChatSection />
    </div>
  );
};

export default Chat;
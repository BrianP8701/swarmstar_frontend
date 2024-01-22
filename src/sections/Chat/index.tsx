import React, { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import AgentNavigation from './AgentNavigation';

const Chat = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('GlobalContext is undefined, ensure the GlobalProvider is in the component tree above Chat');
  }
  const { isRunning } = context;

  if (!isRunning) {
    return <div>No active swarm</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div style={{ flex: 0.1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <AgentNavigation />
      </div>
      <div style={{ flex: 0.9, height: '100%' }}>Chat Area</div>
    </div>
  );
};

export default Chat;
import React, { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import ChatNavigation from './ChatNavigation/ChatNavigation';
import NodePreview from './NodePreview/NodePreview';
import ChatSection from './ChatSection/ChatSection';

const ChatContainer = () => {
  const context = useContext(GlobalContext);
  const { isRunning } = context;

  if (!isRunning) {
    return <div>No active swarm</div>;
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
      <div style={{
        position: 'fixed',
        width: '150px',
        height: 'calc(100vh - 50px)',
        top: '50px',
        left: '70px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ChatNavigation />
      </div>
      <div style={{
        position: 'fixed',
        width: 'calc(100vw - 220px)',
        height: 'calc(100vh - 50px)',
        top: '65px',
        left: '220px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ height: '10%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <NodePreview />
        </div>
        <div style={{ height: '90%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ChatSection />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
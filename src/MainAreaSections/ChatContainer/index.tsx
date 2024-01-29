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
        left: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ChatNavigation />
      </div>
      <div style={{ 
        position: 'fixed',
        width: 'calc(100vw - 250px)',
        height: 'calc(100vh - 110px)',
        top: '50px',
        left: '210px',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
        }}>
        <div style={{ height: '20%', width: '100%' }}>
          <NodePreview />
        </div>
        <div style={{ height: '80%', width: '100%' }}>
          <ChatSection />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
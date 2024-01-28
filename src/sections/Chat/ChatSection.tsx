import React, { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';

const ChatSection = () => {
    const context = useContext(GlobalContext);
    const { selectedAgent } = context;
  
    if (!selectedAgent) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Empty rectangles */}
          <div style={{ height: '20%', borderRadius: '10px', margin: '10px', border: '1px solid #000' }}></div>
          <div style={{ flex: 1, borderRadius: '10px', margin: '10px', border: '1px solid #000' }}></div>
        </div>
      );
    }
  
    // Placeholder for agent info retrieval
    const agentInfo = {}; // Replace with actual logic to retrieve agent info
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ height: '20%', borderRadius: '10px', margin: '10px', border: '1px solid #000' }}>
          {/* Agent info here */}
        </div>
        <div style={{ flex: 1, borderRadius: '10px', margin: '10px', border: '1px solid #000' }}>
          {/* Chat content here */}
        </div>
      </div>
    );
  };

  export default ChatSection;


import React, { useContext } from 'react';
import { GlobalContext } from '../../../GlobalContext';

const NodePreview = () => {
  const { selectedAgent } = useContext(GlobalContext);

  if (!selectedAgent) {
    return (
        <div style={{ 
            height: '100%', 
            width: '80%',
            borderRadius: '10px', 
            margin: '0 auto', // Updated margin
            border: '1px solid #000', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
          }}>No Agent Selected</div>
    );
  }

  // Placeholder for agent info retrieval
  const agentInfo = {}; // Replace with actual logic to retrieve agent info

  return (
    <div style={{ 
        height: '100%', 
        width: '100%',
        borderRadius: '10px', 
        margin: '0 auto', // Updated margin
        border: '1px solid #000', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
      }}>Agent Info Here</div>
  );
};

export default NodePreview;
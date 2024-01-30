import React, { useContext } from 'react';
import { GlobalContext } from '../../../GlobalContext';

const NodePreview = () => {
  const { selectedAgent } = useContext(GlobalContext);

  if (!selectedAgent) {
    return (
      <div style={{
        height: '90%',
        width: '90%',
        borderRadius: '15px',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'inset 0px 0px 20px 0px rgba(0,0,0,0.85), 0px 0px 20px 0px rgba(0,0,0,0.85)',
      }}>No Agent Selected</div>
    );
  }

  // Placeholder for agent info retrieval
  const agentInfo = {}; // Replace with actual logic to retrieve agent info

  return (
    <div style={{
      height: '90%',
      width: '90%',
      borderRadius: '15px',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: 'inset 0px 0px 20px 0px rgba(0,0,0,0.85), 0px 0px 20px 0px rgba(0,0,0,0.85)',
    }}>Agent Info Here</div>
  );
};

export default NodePreview;
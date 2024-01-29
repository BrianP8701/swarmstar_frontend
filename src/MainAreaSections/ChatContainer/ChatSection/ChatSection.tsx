import React, { useContext } from 'react';
import { GlobalContext } from '../../../GlobalContext';

const ChatSection = () => {
  const { selectedAgent } = useContext(GlobalContext);

  // Ensure the parent container of Chat component has a defined height.
  // For demonstration, let's assume it's a full-screen height minus some margin/padding.
  // You would need to adjust this according to your actual layout.

  if (!selectedAgent) {
    return (
        <div style={{ 
            flex: 1, 
            borderRadius: '10px', 
            margin: '0 auto',
            border: '1px solid #000', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '80%', // Set a minimum height relative to the viewport height
            width: '80%',
            marginTop: '20px',
          }}></div>
    );
  }

  return (
    <div style={{ 
        flex: 1, 
        borderRadius: '10px', 
        margin: '0 auto',
        border: '1px solid #000', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%', // Set a minimum height relative to the viewport height
        width: '100%',
        marginTop: '20px',
      }}>
      {/* Chat content here */}
    </div>
  );
};

export default ChatSection;
import React, { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';

const AgentNavigation = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('GlobalContext is undefined, ensure the GlobalProvider is in the component tree above AgentNavigation');
  }
  const { agents } = context; // Assuming agents is an array of agent names

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '80%',
      margin: '15px 0',
      overflow: 'auto',
      borderRadius: '10px',
      border: '1px solid #000',
      padding: '0 10px'
    }}>
      {agents.map((agent, index) => (
        <div key={index} style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #000',
          borderRadius: '5px',
          margin: '3px 0'
        }}>
          {agent}
        </div>
      ))}
    </div>
  );
};

export default AgentNavigation;
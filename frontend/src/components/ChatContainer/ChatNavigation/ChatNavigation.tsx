import { useContext } from 'react';
import { GlobalContext } from '@configs/GlobalContext';
import '@components/ChatContainer/ChatNavigation/ChatNavigation.css'; // Import the CSS file here

const ChatNavigation = () => {
  const { agents, setAgents } = useContext(GlobalContext);
  const all_agents = agents.all_agents;



  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start', // Changed from 'center' to 'flex-start' to align buttons to the left
      width: '100%',
      overflow: 'auto', // Changed from 'hidden' to 'auto' to allow scrolling
      borderRadius: '15px',
      height: '90%',
      padding: '5px 0',
      background: '#202123',
      boxShadow: '0 0 10px 0 #000',
      gap: '8px' // Added gap to create space between buttons
    }}>
      {all_agents.map((agent, index) => (
        <button key={index} onClick={() => setAgents(prev => ({ ...prev, currentAgent: agent }))} style={{
          display: 'inline-block', // Changed from 'flex' to 'inline-block' to make the button size fit the content
          justifyContent: 'flex-start',
          minWidth: '150px',
          alignItems: 'center',
          border: 'none',
          borderRadius: '5px',
          margin: '2px 0', // Margin is now effective due to overflow change on parent
          color: '#c5c5d2',
          background: 'transparent',
          cursor: 'pointer',
          padding: '5px 5px', // Increased vertical padding to make button bigger
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }}
          onMouseOver={(e) => e.currentTarget.style.border = '1px solid #c5c5d2'}
          onMouseOut={(e) => e.currentTarget.style.border = 'none'}
        >
          {agent}
        </button>
      ))}
    </div>
  );
};

export default ChatNavigation;
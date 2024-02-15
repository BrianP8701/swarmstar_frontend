import { useEffect } from 'react';
import io from 'socket.io-client';
import config from '@configs/configLoader';

const socket = io(config.backend_url);

useEffect(() => {
  socket.on('new_chat', (data) => {
    const chat_id = data.chat_id;
    const swarm = data.swarm;
    console.log('New chat:', chat_id, swarm);
  });

  socket.on('new_ai_message', (data) => {
    const chat_id = data.chat_id;
    const message = data.message;
    console.log('New AI message:', chat_id, message);
  });

  // Cleanup on unmount
  return () => {
    socket.disconnect();
    return undefined; // Explicitly return undefined
  };
}, []);



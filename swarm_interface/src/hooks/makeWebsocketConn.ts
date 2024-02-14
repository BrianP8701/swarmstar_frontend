import { useEffect } from 'react';
import io from 'socket.io-client';
import config from '@configs/configLoader';

const socket = io(config.backend_url);

useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });
  
    socket.on('update', (data) => {
      console.log('Data received from server:', data);
    });
  
    // Cleanup on unmount
    return () => {
      socket.disconnect();
      return undefined; // Explicitly return undefined
    };
  }, []);



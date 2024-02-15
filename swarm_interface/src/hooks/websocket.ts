import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import config from '@configs/configLoader';

const useWebSocket = () => {
  const username = useSelector((state: RootStateType) => state.user.username);

  useEffect(() => {
    const wsUrl = `${config.backend_ws_url}/${username}`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received data from server:', data);


      if (data.event === 'new_ai_message') {
        console.log('if we are in here... TURN THE FUCK UP BOY LETS GOOOOOOOOOOOOOO')
        const newMessage = data.data.message.content;
        console.log('New message:', newMessage);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, [username]);

};

export default useWebSocket;

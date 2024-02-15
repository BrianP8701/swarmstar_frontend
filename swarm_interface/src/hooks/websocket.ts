import { useEffect } from 'react';
import io from 'socket.io-client';
import config from '@configs/configLoader';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const useWebSocket = (postMessages: (messages: string[]) => void) => {

  const username = useSelector((state: RootStateType) => state.user.username);
  useEffect(() => {
    const socket = io(`${config.backend_ws_url}/${username}`, {
      transports: ['websocket'],
    });

    socket.on('message', (data) => {
      console.log('Received data from server:', data);

      if (data.event === 'new_ai_message') {
        const newMessage = data.data.message.content;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [username, postMessages]);
};

export default useWebSocket;

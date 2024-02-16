import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import config from '@configs/configLoader';
import useReceiveAiMessage from '@hooks/chat/receiveAiMessage';
import receiveNewChat from '@/hooks/chat/receiveNewChat';

const useWebSocket = () => {
  const dispatch = useDispatch(); // Use useDispatch here
  const username = useSelector((state: RootStateType) => state.user.username);
  const { handleAIMessage } = useReceiveAiMessage();
  const current_swarm_id = useSelector((state: RootStateType) => state.user.current_swarm_id);
  const current_chat_id = useSelector((state: RootStateType) => state.user.current_chat_id);

  console.log('the websocket thing got the new swarm id:', current_swarm_id);


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
        console.log('Received new AI message:', data.data);
        handleAIMessage(data.data);
      }

      if (data.event === 'create_chat') {
        console.log('Received new chat:', data.data);
        receiveNewChat(dispatch, data.data.chat_id, data.data.swarm_id, data.data.swarm, data.data.chat, current_swarm_id, current_chat_id);
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
  }, [username, dispatch]); // Include dispatch in the dependency array if it's used in the effect

};

export default useWebSocket;

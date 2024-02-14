import { useEffect } from 'react';
import EventSource from 'eventsource';
import config from '@configs/configLoader';
import { setSwarm } from '@/redux/swarmSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { addMessage } from '@/redux/chatSlice';

const useCreateChat = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const dispatch = useDispatch();
  const currentChatId = useSelector((state: RootStateType) => state.user.current_chat_id); // Moved to the top level

  useEffect(() => {
    const eventSource = new EventSource(config.backend_url);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const swarm = data.swarm;
      const message = data.message;
      const chatId = swarm.chat_id;

      dispatch(setSwarm(swarm));
      if (chatId === currentChatId) {
        dispatch(addMessage(message));
      }
    };

    return () => eventSource.close(); // Cleanup on unmount
  }, [currentChatId, dispatch]); // Added dependencies

};

export default useCreateChat;
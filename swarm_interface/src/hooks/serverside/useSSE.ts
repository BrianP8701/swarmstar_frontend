import { useEffect } from 'react';
import EventSource from 'eventsource';
import config from '@configs/configLoader';
import useCreateConversation from '@/hooks/serverside/chat/createConversation';

const useSSE = () => {

  useEffect(() => {
    const eventSource = new EventSource(config.backend_url);
    const { handleCreateConversation } = useCreateConversation();

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const type = data.type;
      switch (type) {
        case "create_conversation":
          handleCreateConversation(data);
          break;
        case "receive_message":
          console.log("Received message:", data.message);
          break;
        default:
          console.log("Unknown event type:", data);
      }
    };

    return () => eventSource.close(); // Cleanup on unmount
  }, []);

};

export default useSSE;

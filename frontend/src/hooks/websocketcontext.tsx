import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import config from '@configs/configLoader';
import { setSwarm } from '@/redux/swarmSlice';
import { addMessage } from '@/redux/chatSlice';
import { addNode, updateNodeStatus } from '@/redux/treeSlice';

interface WebSocketContextType {
  // Define the shape of your context here, for now it's empty since you're not providing any value
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  // Ensure your RootStateType correctly types `state.user.username` and others
  const user_id = useSelector((state: RootStateType) => state.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user_id) return; // Ensures username is present before proceeding

    const wsUrl = `${config.backend_ws_url}/${user_id}`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => console.log('WebSocket connected');
    socket.onmessage = (event) => {
      const websocket_event = JSON.parse(event.data);
      console.log('WebSocket message:', websocket_event)

      if (websocket_event.type === 'update_swarm') {
        dispatch(setSwarm(websocket_event.data.swarm));
      }
      else if (websocket_event.type === 'append_message_to_chat') {
        dispatch(addMessage(websocket_event.data.message));
      }
      else if (websocket_event.type === 'add_node_to_tree') {
        dispatch(addNode({ 
          parentNodeId: websocket_event.data.parent_node_id, 
          newNode: websocket_event.data.new_node 
        }));
      }
      else if (websocket_event.type === 'update_node_status') {
        dispatch(updateNodeStatus({
          nodeId: websocket_event.data.node_id,
          status: websocket_event.data.status
        }));
      }
      else {
        console.error('Unknown WebSocket event:', websocket_event);
      }
      
    };
    socket.onerror = (error) => console.error('WebSocket error:', error);
    socket.onclose = () => console.log('WebSocket disconnected');

    return () => socket.close();
  }, [user_id, dispatch]);

  // This value can be expanded to include methods to send messages, etc.
  const value = {};

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === null) throw new Error('useWebSocket must be used within a WebSocketProvider');
  return context;
};

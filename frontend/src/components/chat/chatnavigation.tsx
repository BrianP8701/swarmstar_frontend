import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import useSetCurrentChat from '@/hooks/chat/setCurrentChat';

const ChatNavigation = () => {
    const nodes_with_active_chat = useSelector((state: RootStateType) => state.swarm.nodes_with_active_chat);
    const nodes_with_terminated_chat = useSelector((state: RootStateType) => state.swarm.nodes_with_terminated_chat);
    const node_ids_to_chat_names = useSelector((state: RootStateType) => state.swarm.node_ids_to_chat_names);
    const { handleSetCurrentChat } = useSetCurrentChat();
    

    return (
        <div className="h-full w-full bg-gray-800 pl-1 pr-1 pt-2 pb-2 agent-navigation-container border-r border-gray-700">
            {nodes_with_active_chat.map((chat_id) => (
                <button className="agent-button w-full" key={chat_id} onClick={() => handleSetCurrentChat(chat_id)}>
                    {node_ids_to_chat_names[chat_id]}
                </button>
            ))}
            {nodes_with_terminated_chat.map((chat_id) => (
                <button className="agent-button w-full bg-gray-900" key={chat_id} onClick={() => handleSetCurrentChat(chat_id)}>
                    {node_ids_to_chat_names[chat_id]}
                </button>
            ))}
        </div>
    );
    
};

export default ChatNavigation;

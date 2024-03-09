import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import useSetCurrentChat from '@/hooks/chat/setCurrentChat';

const ChatNavigation = () => {
    const nodes_with_active_chat = useSelector((state: RootStateType) => state.swarm.nodes_with_active_chat);
    const nodes_with_terminated_chat = useSelector((state: RootStateType) => state.swarm.nodes_with_terminated_chat);
    const current_chat_id = useSelector((state: RootStateType) => state.user.current_chat_id);
    const { handleSetCurrentChat } = useSetCurrentChat();

    return (
        <div className="h-full w-full bg-gray-900 pl-2 pr-2 pt-2 pb-2 agent-navigation-container border-r border-gray-700">
            {Object.keys(nodes_with_active_chat).map((chat_id) => (
                <button
                    className={`agent-button w-full ${chat_id === current_chat_id ? 'selected-chat' : ''}`}
                    key={chat_id}
                    onClick={() => handleSetCurrentChat(chat_id)}
                >
                    {nodes_with_active_chat[chat_id]}
                </button>
            ))}
            {Object.keys(nodes_with_terminated_chat).map((chat_id) => (
                <button
                    className={`agent-button w-full ${chat_id === current_chat_id ? 'selected-chat' : ''}`}
                    style={{ color: '#EF4444' }}
                    key={chat_id}
                    onClick={() => handleSetCurrentChat(chat_id)}
                >
                    {nodes_with_terminated_chat[chat_id]}
                </button>
            ))}
        </div>
    );
};

export default ChatNavigation;
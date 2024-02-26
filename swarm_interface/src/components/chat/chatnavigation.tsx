import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import useSetCurrentChat from '@/hooks/chat/setCurrentChat';

const ChatNavigation = () => {
    const live_chat_ids = useSelector((state: RootStateType) => state.swarm.live_chat_ids);
    const terminated_chat_ids = useSelector((state: RootStateType) => state.swarm.terminated_chat_ids);
    const chat_ids = useSelector((state: RootStateType) => state.swarm.chat_ids);
    const { handleSetCurrentChat } = useSetCurrentChat();
    
    console.log('live_chat_ids:', live_chat_ids);
    console.log('terminated_chat_ids:', terminated_chat_ids);

    return (
        <div className="h-full w-full bg-gray-800 pl-1 pr-1 pt-2 pb-2 agent-navigation-container border-r border-gray-700">
            {live_chat_ids.map((chat_id) => (
                <button className="agent-button w-full" key={chat_id} onClick={() => handleSetCurrentChat(chat_id)}>
                    {chat_ids[chat_id]}
                </button>
            ))}
            {terminated_chat_ids.map((chat_id) => (
                <button className="agent-button w-full bg-gray-900" key={chat_id} onClick={() => handleSetCurrentChat(chat_id)}>
                    {chat_ids[chat_id]}
                </button>
            ))}
        </div>
    );
    
};

export default ChatNavigation;

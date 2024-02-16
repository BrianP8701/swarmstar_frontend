import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import useSetChat from '@/hooks/chat/setChat';

const ChatNavigation = () => {
    const live_chat_ids = useSelector((state: RootStateType) => state.swarm.live_chat_ids);
    const terminated_chat_ids = useSelector((state: RootStateType) => state.swarm.terminated_chat_ids);
    const chat_names = useSelector((state: RootStateType) => state.swarm.chat_names);
    const { handleSetChat } = useSetChat();

    console.log('live_chat_ids:', live_chat_ids);
    console.log('terminated_chat_ids:', terminated_chat_ids);

    return (
        <div className="h-full w-full bg-gray-800 pl-1 pr-1 pt-2 pb-2 agent-navigation-container border-r border-gray-700 ">
            {live_chat_ids.map((chat_id, index) => (
                <button className="agent-button w-full" key={`live-${index}`} onClick={() => handleSetChat(chat_id)}>
                    {chat_names[chat_id]}
                </button>
            ))}
            {terminated_chat_ids.map((chat_id, index) => (
                <button className="agent-button w-full bg-gray-900" key={`terminated-${index}`} onClick={() => handleSetChat(chat_id)}>
                    {chat_names[chat_id]}
                </button>
            ))}
        </div>
    );
};

export default ChatNavigation;

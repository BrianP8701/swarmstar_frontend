import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { setCurrentConversationID } from '@/redux/userSlice';

const ConversationNavigation = () => {
    const dispatch = useDispatch();
    const current_conversation_id = useSelector((state: RootStateType) => state.user.current_conversation_id);
    const live_conversation_ids = useSelector((state: RootStateType) => state.swarm.live_conversation_ids);
    const terminated_conversation_ids = useSelector((state: RootStateType) => state.swarm.terminated_conversation_ids);
    const conversation_names = useSelector((state: RootStateType) => state.swarm.conversation_names);
    const conversation_ids = useSelector((state: RootStateType) => state.swarm.conversation_ids);
    const swarm = useSelector((state: RootStateType) => state.swarm);

    console.log('ConversationNavigation', swarm);
    console.log('live_conversations_ids', live_conversation_ids);
    console.log('conversation_ids', conversation_ids);
    console.log('conversation_names', conversation_names);
    console.log('terminated_conversations_ids', terminated_conversation_ids);
    const selectAgent = (index: number) => {
        dispatch(setCurrentConversationID(conversation_ids[index]));
        console.log(`Agent ${conversation_ids[index]} selected`);
    };

    return (
        <div className="h-full w-full bg-gray-800 pl-1 pr-1 pt-2 pb-2 agent-navigation-container border-r border-gray-700 ">
            {live_conversation_ids.map((conversation_id, index) => (
                <button className="agent-button w-full" key={`live-${index}`} onClick={() => selectAgent(conversation_ids.indexOf(conversation_id))}>
                    {conversation_names[conversation_id]}
                </button>
            ))}
            {terminated_conversation_ids.map((conversation_id, index) => (
                <button className="agent-button w-full bg-gray-900" key={`terminated-${index}`} onClick={() => selectAgent(conversation_ids.indexOf(conversation_id))}>
                    {conversation_names[conversation_id]}
                </button>
            ))}
        </div>
    );
};

export default ConversationNavigation;

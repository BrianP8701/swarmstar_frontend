import { useDispatch, useSelector } from 'react-redux';
import { RootStateType, ChatState, SwarmState } from '@models/rootstate';
import { setChat } from '@/redux/chatSlice';
import { setSwarm } from '@/redux/swarmSlice';

const receiveNewChat = (
    chat_id: string,
    swarm_id: string,
    swarm: SwarmState,
    chat: ChatState,
) => {
    const dispatch = useDispatch();
    const current_swarm_id = useSelector((state: RootStateType) => state.user.current_swarm_id);
    const current_chat_id = useSelector((state: RootStateType) => state.user.current_chat_id);

    console.log('Received new chat:', chat_id, swarm_id, swarm, chat, current_swarm_id, current_chat_id);
    console.log('swarm_id:', swarm_id);
    console.log('current_swarm_id:', current_swarm_id);
    console.log('current_chat_id:', current_chat_id);

    if (swarm_id !== current_swarm_id) {
        console.log('Received chat from different swarm');
        return;
    } else {
        console.log('Received chat from same swarm')
        dispatch(setSwarm(swarm));
    }

    if (chat_id !== current_chat_id) {
        console.log('Received chat from different chat');
        return;
    } else {
        console.log('Received chat from same chat');
        dispatch(setChat(chat));
    }
};

export default receiveNewChat;
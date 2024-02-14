import { useDispatch } from 'react-redux';
import { setSwarm } from '@/redux/swarmSlice';
import { addMessage } from '@/redux/conversationSlice';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const useReceiveAiMessage = () => {
    const dispatch = useDispatch();
    const currentConversationId = useSelector((state: RootStateType) => state.user.current_conversation_id);

    const handleMessage = async (data: any) => {
        try {
            const conversation_id = data.conversation_id;
            const message = data.message;
            if (conversation_id !== currentConversationId) {
                return;
            } else {
                dispatch(addMessage(message));
            }
        } catch (error) {
            console.error("Error creating conversation:", error);
            throw error;
        }
    };

    return { handleMessage };
};

export default useReceiveAiMessage;


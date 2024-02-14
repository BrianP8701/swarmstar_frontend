import { useDispatch } from 'react-redux';
import { setSwarm } from '@/redux/swarmSlice';
import { addMessage} from '@/redux/conversationSlice';

const useCreateConversation = () => {
    const dispatch = useDispatch();

    const handleCreateConversation = async (data: any) => {
        try {
            const swarm = data.swarm;
            const message = data.message;
            dispatch(setSwarm(swarm));
            dispatch(addMessage(message));
        } catch (error) {
            console.error("Error creating conversation:", error);
            throw error;
        }
    };

    return { handleCreateConversation };
};

export default useCreateConversation;


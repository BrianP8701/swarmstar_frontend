import { useDispatch } from 'react-redux';
import { addMessage } from '@/redux/chatSlice';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const useReceiveAiMessage = () => {
    const dispatch = useDispatch();
    const currentchatId = useSelector((state: RootStateType) => state.user.current_chat_id);

    const handleAIMessage = async (data: any) => {
        try {
            const chat_id = data.chat_id;
            const message = data.message;
            if (chat_id !== currentchatId) {
                return;
            } else {
                dispatch(addMessage(message));
            }
        } catch (error) {
            console.error("Error creating chat:", error);
            throw error;
        }
    };

    return { handleAIMessage };
};

export default useReceiveAiMessage;

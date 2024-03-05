import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { setChat } from '@/redux/chatSlice';

const useHandleUserMessage = () => {
    const token = useSelector((state: RootStateType) => state.token.token);
    const current_chat_id = useSelector((state: RootStateType) => state.user.current_chat_id);
    const dispatch = useDispatch();

    const handleUserMessage = async (message: string) => {
        const messageObject = {
            role: 'user',
            content: message,
        };
        
        try {
            const response = await fetch('/api/chat/handle_user_message', {
                method: 'PUT',
                body: JSON.stringify({ message: messageObject, chat_id: current_chat_id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();

            if (response.ok) {
                dispatch(setChat(data.chat));
            } else {
                throw new Error('Sending user message failed due to server error');
            }
        } catch (error) {
            console.error("Error sending user message:", error);
            throw error;
        }
    };
    return { handleUserMessage };
};

export default useHandleUserMessage;

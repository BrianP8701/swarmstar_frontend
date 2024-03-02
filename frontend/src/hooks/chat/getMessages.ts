import { useDispatch } from 'react-redux';
import { addMessage } from '@/redux/chatSlice';
import { RootStateType } from '@models/rootstate';
import { useSelector } from 'react-redux';

interface Message {
    role: string;
    content: string;
}

const useGetMessages = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleGetMessages = async (chat_id: string) => {
        try {
            const response = await fetch(`/api/chat/get_messages?node_id=${chat_id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            
            if (response.ok) {
                data.messages.forEach((message: Message) => {
                    dispatch(addMessage(message));
                });
            } else {
                return data.error;
            }
        } catch (error) {
            console.error("Error getting messages:", error);
            throw error;
        }
    };

    return { handleGetMessages };
};

export default useGetMessages;

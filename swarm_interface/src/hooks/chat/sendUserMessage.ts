import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const useSendUserMessage = () => {
    const token = useSelector((state: RootStateType) => state.token.token);
    const current_chat_id = useSelector((state: RootStateType) => state.user.current_chat_id);
    const current_swarm_id = useSelector((state: RootStateType) => state.user.current_swarm_id);

    const handleSendUserMessage = async (message: string) => {
        const messageObject = {
            role: 'user',
            content: message,
        };
        try {
            const response = await fetch('/api/chat/user_message', {
                method: 'PUT',
                body: JSON.stringify({ message: messageObject, chat_id: current_chat_id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                return;
            } else {
                throw new Error('Sending user message failed due to server error');
            }
        } catch (error) {
            console.error("Error sending user message:", error);
            throw error;
        }
    };
    return { handleSendUserMessage };
};

export default useSendUserMessage;

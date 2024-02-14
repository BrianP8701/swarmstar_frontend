import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const useSendUserMessage = () => {
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleSendUserMessage = async (message: string, chat_id: string, swarm_id: string) => {
        try {
            const response = await fetch('/api/chat/send_user_message', {
                method: 'PUT',
                body: JSON.stringify({ message, chat_id, swarm_id }),
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

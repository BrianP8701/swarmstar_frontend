import { useDispatch, useSelector } from 'react-redux';
import { setUser, UserState } from '@/redux/userSlice';
import { RootStateType, ConversationState } from '@models/rootstate';
import { setConversation } from '@/redux/conversationSlice';

const useSetConversation = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleConversation = (conversation: ConversationState, user: UserState) => {
        dispatch(setConversation(conversation));
        dispatch(setUser(user));
    };

    const handleSetConversation = async (conversation_id: string) => {
        try {
            const response = await fetch(`/api/spawn/set_conversation?conversation_id=${conversation_id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();

            if (response.ok) {
                handleConversation(data.conversation, data.user);
            } else {
                return data.error;
            }
        } catch (error) {
            console.error("Error setting conversation:", error);
            throw error;
        }
    };

    return { handleSetConversation };
};

export default useSetConversation;

import { useDispatch, useSelector } from 'react-redux';
import { setUser, UserState, setCurrentChatID } from '@/redux/userSlice';
import { RootStateType, ChatState } from '@models/rootstate';
import { setChat } from '@/redux/chatSlice';

const useSetChat = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleChat = (chat: ChatState) => {
        dispatch(setChat(chat));
    };

    const handleSetChat = async (chat_id: string) => {
        try {
            dispatch(setCurrentChatID(chat_id));
            const response = await fetch(`/api/chat/get_chat?chat_id=${chat_id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();

            if (response.ok) {
                console.log('Setting chat:', data.chat)
                handleChat(data.chat);
            } else {
                return data.error;
            }
        } catch (error) {
            console.error("Error setting chat:", error);
            throw error;
        }
    };

    return { handleSetChat };
};

export default useSetChat;
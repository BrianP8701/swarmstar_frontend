import { useDispatch, useSelector } from 'react-redux';
import { setUser, UserState } from '@/redux/userSlice';
import { RootStateType, ChatState } from '@models/rootstate';
import { setChat } from '@/redux/chatSlice';

const useSetChat = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleChat = (chat: ChatState, user: UserState) => {
        dispatch(setChat(chat));
        dispatch(setUser(user));
    };

    const handleSetChat = async (chat_id: string) => {
        try {
            const response = await fetch(`/api/chat/set_chat?chat_id=${chat_id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();

            if (response.ok) {
                handleChat(data.chat, data.user);
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

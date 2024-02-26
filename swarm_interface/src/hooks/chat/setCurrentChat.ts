import { useDispatch, useSelector } from 'react-redux';
import { setUser, UserState } from '@/redux/userSlice';
import { RootStateType } from '@models/rootstate';
import { setChat, ChatState } from '@/redux/chatSlice';

const useSetCurrentChat = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleResponse = (chat: ChatState, user: UserState) => {
        console.log('user', user)
        console.log('chat', chat)
        dispatch(setChat( chat ));
        dispatch(setUser( user ));
    };

    const handleSetCurrentChat = async (chat_id: string) => {
        try {
            const response = await fetch(`/api/chat/set_current_chat`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({ chat_id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();

            if (response.ok) {
                handleResponse(data.chat, data.user);
            } else {
                return data.error;
            }
        } catch (error) {
            console.error("Error setting chat:", error);
            throw error;
        }
    };

    return { handleSetCurrentChat };
};

export default useSetCurrentChat;
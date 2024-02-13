import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/tokenSlice';
import { setUser, UserState } from '@/redux/userSlice';


const useSignUp = () => {
    const dispatch = useDispatch();

    const handleUserData = (user: UserState, token: string) => {
        dispatch(setUser(user));
        dispatch(setToken(token));
    };

    const handleSignUp = async (username: string, password: string, openai_key: string) => {
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'PUT',
                body: JSON.stringify({ username, password, openai_key }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                handleUserData(data.user, data.token);
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            throw error;
        }
    };
    return { handleSignUp };
};

export default useSignUp;

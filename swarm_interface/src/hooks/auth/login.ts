import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/tokenSlice';
import { setUser, UserState } from '@/redux/userSlice';


const useLoginHook = () => {
    const dispatch = useDispatch();

    const handleUserData = (user: UserState, token: string) => {
        dispatch(setUser(user));
        console.log('user', user);
        console.log('token', token);
        dispatch(setToken(token));
    };

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
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
    return { handleLogin };
};

export default useLoginHook;

import { useDispatch } from 'react-redux';
import { setUserLogin, setToken } from '@/redux/userSlice';


const useHandleLogin = () => {
    const dispatch = useDispatch();
    const handleUserLogin = (user_id: string, user_swarms: string[], token: string) => {
        dispatch(setUserLogin({ user_id, user_swarms }));
        dispatch(setToken(token));
    };

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await fetch('/api/handleLogin', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                handleUserLogin(data.user_id, data.user_swarms, data.token);
            } else {
                throw new Error('Login failed due to server error');
            }
        } catch (error) {
            throw error;
        }
    };
    return { handleLogin };
};

export default useHandleLogin;

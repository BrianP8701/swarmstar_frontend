import { useDispatch } from 'react-redux';
import { setUserSwarms, setToken } from '@/redux/userSlice';


const useHandleLogin = () => {
    const dispatch = useDispatch();

    const handleUserLogin = (swarm_ids: string[], swarm_names: { [swarm_id: string]: string }, token: string) => {
        dispatch(setUserSwarms({ swarm_ids, swarm_names }));
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

            if (response.ok) {
                const data = await response.json();
                handleUserLogin(data.user_swarms.swarm_ids, data.user_swarms.swarm_names, data.token);
                console.log("data: ", data)
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

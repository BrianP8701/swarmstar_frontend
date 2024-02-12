import { useDispatch } from 'react-redux';
import { setUserSwarms, setToken } from '@/redux/userSlice';

const useLoginHook = () => {
    const dispatch = useDispatch();

    const handleUserData = (data: { user_swarms: { swarm_ids: string[], swarm_names: { [swarm_id: string]: string } }, token: string }) => {
        dispatch(setUserSwarms({ swarm_ids: data.user_swarms.swarm_ids, swarm_names: data.user_swarms.swarm_names }));
        dispatch(setToken(data.token));
    };

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password, type: 'login' }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                handleUserData(data);
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

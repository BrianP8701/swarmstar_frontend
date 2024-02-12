import { useDispatch } from 'react-redux';
import { setUserSwarms, setToken } from '@/redux/userSlice';


const useSignUp = () => {
    const dispatch = useDispatch();

    const handleUserSignUp = (swarm_ids: string[], swarm_names: { [swarm_id: string]: string }, token: string) => {
        dispatch(setUserSwarms({ swarm_ids, swarm_names }));
        dispatch(setToken(token));
    };

    const handleSignUp = async (username: string, password: string, openai_key: string) => {
        try {
            console.log("username: ", username)
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ username, password, openai_key }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                handleUserSignUp(data.user_swarms.swarm_ids, data.user_swarms.swarm_names, data.token);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    return { handleSignUp };
};

export default useSignUp;

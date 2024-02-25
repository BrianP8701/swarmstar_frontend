import { useDispatch, useSelector } from 'react-redux';
import { setSwarm, SwarmState } from '@/redux/swarmSlice';
import { setUser, UserState } from '@/redux/userSlice';
import { RootStateType } from '@models/rootstate';
import { clearMessages } from '@/redux/chatSlice';

const useSetSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleSwarm = (swarm: SwarmState, user: UserState) => {
        console.log('Setting swarm:', swarm, user)
        dispatch(setSwarm(swarm));
        dispatch(setUser(user));
        dispatch(clearMessages());
    };

    const handleSetSwarm = async (swarm_id: string) => {
        try {
            const response = await fetch(`/api/swarm/get_swarm?swarm_id=${swarm_id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();

            if (response.ok) {
                handleSwarm(data.swarm, data.user);
            } else {
                return data.error;
            }
        } catch (error) {
            console.error("Error setting swarm:", error);
            throw error;
        }
    };

    return { handleSetSwarm };
};

export default useSetSwarm;

import { useDispatch, useSelector } from 'react-redux';
import { setSwarm, SwarmState } from '@/redux/swarmSlice';
import { setUser, UserState } from '@/redux/userSlice';
import { RootStateType } from '@models/rootstate';

const useGetSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.user.token);

    const handleSwarm = (swarm: SwarmState, user: UserState) => {
        dispatch(setSwarm(swarm));
        dispatch(setUser(user));
    };

    const handleGetSwarm = async (swarm_id: string) => {
        try {
            const response = await fetch(`/api/spawn/get_swarm?swarm_id=${swarm_id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();

            if (response.ok) {
                console.log('data:', data);
                handleSwarm(data.swarm, data.user);
            } else {
                return data.error;
            }
        } catch (error) {
            console.error("Error creating swarm:", error);
            throw error;
        }
    };

    return { handleGetSwarm };
};

export default useGetSwarm;

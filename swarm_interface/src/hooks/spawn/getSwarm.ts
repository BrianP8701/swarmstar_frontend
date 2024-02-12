import { useDispatch, useSelector } from 'react-redux';
import { setSwarm } from '@/redux/swarmSlice';
import { setCurrentSwarm } from '@/redux/userSlice';
import { RootStateType } from '@models/rootstate';

const useGetSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.user.token);

    const handleSwarm = (swarm_id: string, swarm_name: string, goal: string, spawned: boolean) => {
        dispatch(setSwarm({ swarm_id, swarm_name, goal, spawned })); 1
        dispatch(setCurrentSwarm(swarm_id));
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
                handleSwarm(swarm_id, data.name, data.goal, data.spawned);
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

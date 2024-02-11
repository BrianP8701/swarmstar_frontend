import { useDispatch } from 'react-redux';
import { setSwarm } from '@/redux/swarmSlice';
import { setCurrentSwarm, setUserSwarms } from '@/redux/userSlice';

const useSetSwarm = () => {
    const dispatch = useDispatch();

    const handleSwarm = (swarm_id: string, swarm_name: string, goal: string, spawned: boolean) => {
        dispatch(setSwarm({ swarm_id, swarm_name, goal, spawned }));
        dispatch(setCurrentSwarm(swarm_id));
    };

    const handleSetSwarm = async (swarm_id: string) => {
        try {
            const response = await fetch('/api/spawn/getSwarm', {
                method: 'GET',
                body: JSON.stringify({ swarm_id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                handleSwarm(data.swarm_id, data.name, data.goal, data.spawned);
            } else {
                throw new Error('Creating swarm failed due to server error');
            }
        } catch (error) {
            console.error("Error creating swarm:", error);
            throw error;
        }
    };

    return { handleSetSwarm };
};

export default useSetSwarm;

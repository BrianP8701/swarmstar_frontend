/*
    This hook will create a new empty swarm in the backend and update the redux store with the 
    addition of the new swarm's information.
*/
import { useDispatch } from 'react-redux';
import { setSwarm } from '@/redux/swarmSlice';

const useCreateSwarm = () => {
    const dispatch = useDispatch();

    const handleNewSwarm = (swarm_id: string, swarm_name: string, swarm_goal: string, spawned: boolean) => {
        dispatch(setSwarm({ swarm_id, swarm_name, swarm_goal, spawned }));
    };

    const handleCreateSwarm = async (newSwarmName: string) => {
        try {
            const response = await fetch('/api/spawn/createSwarm', {
                method: 'POST',
                body: JSON.stringify({ newSwarmName }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                handleNewSwarm(data.swarm_id, data.swarm_name, data.swarm_goal, data.spawned);
            } else {
                throw new Error('Creating swarm failed due to server error');
            }
        } catch (error) {
            console.error("Error creating swarm:", error);
            throw error;
        }
    };

    return { handleCreateSwarm };
};

export default useCreateSwarm;


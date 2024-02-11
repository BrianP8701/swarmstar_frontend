/*
    This hook will create a new empty swarm in the backend and update the redux store with the 
    addition of the new swarm's information.
*/
import { useDispatch, useSelector } from 'react-redux';
import { setSwarm } from '@/redux/swarmSlice';

const useStartSwarm = () => {
    const dispatch = useDispatch();

    const handleNewSwarm = (swarm_id: string, swarm_name: string, swarm_goal: string, spawned: boolean) => {
        dispatch(setSwarm({ swarm_id, swarm_name, swarm_goal, spawned }));
    };

    const handleStartSwarm = async (goal: string, swarm_id: string) => {
        try {
            const response = await fetch('/api/spawn/createSwarm', {
                method: 'POST',
                body: JSON.stringify({ goal, swarm_id}),
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

    return { handleStartSwarm };
};

export default useStartSwarm;
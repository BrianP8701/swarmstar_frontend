/*
    This hook will create a new empty swarm in the backend and update the redux store with the 
    addition of the new swarm's information.
*/
import { useDispatch, useSelector } from 'react-redux';
import { setSwarm } from '@/redux/swarmSlice';
import { RootStateType } from '@models/rootstate';

const useSpawnSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleSpawnSwarm = async (goal: string, swarm_id: string) => {
        try {
            const response = await fetch('/api/swarm/spawn_swarm', {
                method: 'PUT',
                body: JSON.stringify({ goal, swarm_id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();

            if (response.ok) {
                dispatch(setSwarm(data.swarm));
            } else {
                throw new Error('Spawning swarm failed due to server error');
            }
        } catch (error) {
            console.error("Error creating swarm:", error);
            throw error;
        }
    };
    return { handleSpawnSwarm };
};

export default useSpawnSwarm;
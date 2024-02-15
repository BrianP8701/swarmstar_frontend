/*
    This hook will create a new empty swarm in the backend and update the redux store with the 
    addition of the new swarm's information.
*/
import { useDispatch, useSelector } from 'react-redux';
import { setSwarm, SwarmState } from '@/redux/swarmSlice';
import { RootStateType } from '@models/rootstate';
import { clearMessages } from '@/redux/chatSlice';

const useSpawnSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleNewSwarm = (swarm: SwarmState) => {
        console.log('so im assuming this comes before change of goal?')
        dispatch(setSwarm(swarm));
        dispatch(clearMessages());
    };

    const handleSpawnSwarm = async (goal: string, swarm_id: string) => {
        try {
            const response = await fetch('/api/spawn/spawn_swarm', {
                method: 'PUT',
                body: JSON.stringify({ goal, swarm_id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                handleNewSwarm(data);
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
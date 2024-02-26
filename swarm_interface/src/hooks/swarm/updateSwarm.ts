/*
Takes a dict. Updates swarm object in redux accordingly
and updates the backend with the new swarm information.
*/
import { useDispatch, useSelector } from 'react-redux';
import { setSwarm, SwarmState } from '@/redux/swarmSlice';
import { RootStateType } from '@models/rootstate';

const useUpdateSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);
    const currentSwarm = useSelector((state: RootStateType) => state.swarm);

    const handleUpdateSwarm = async (updates: Partial<SwarmState>) => {
        try {
            const response = await fetch('/api/swarm/update_swarm', {
                method: 'PUT',
                body: JSON.stringify({ swarm_updates: updates }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();

            if (response.ok) {
                dispatch(setSwarm(data.swarm));
            } else {
                throw new Error('Updating swarm failed due to server error');
            }
        } catch (error) {
            console.error("Error updating swarm:", error);
            throw error;
        }
    };
    return { handleUpdateSwarm };
};

export default useUpdateSwarm;

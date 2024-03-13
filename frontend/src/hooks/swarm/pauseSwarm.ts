/*
    This hook will pause an existing swarm in the backend and update the redux store with the 
    updated swarm's information.
*/
import { useDispatch } from 'react-redux';
import { setSwarm, Swarm } from '@/redux/swarmSlice';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { clearChat } from '@/redux/chatSlice';

const usePauseSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleUpdatedSwarm = (swarm: Swarm) => {
        dispatch(setSwarm(swarm));
        dispatch(clearChat());
    };

    const handlePauseSwarm = async (swarmId: string) => {
        try {
            const response = await fetch(`/api/swarm/pause_swarm`, {
                method: 'PUT',
                body: JSON.stringify({ swarm_id: swarmId }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                handleUpdatedSwarm(data.swarm);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        } catch (error) {
            console.error("Error pausing swarm:", error);
            throw error;
        }
    };

    return { handlePauseSwarm };
};

export default usePauseSwarm;


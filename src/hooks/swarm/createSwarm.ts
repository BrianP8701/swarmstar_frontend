/*
    This hook will create a new empty swarm in the backend and update the redux store with the 
    addition of the new swarm's information.
*/
import { useDispatch } from 'react-redux';
import { setSwarm, Swarm } from '@/redux/swarmSlice';
import { setUser, UserState } from '@/redux/userSlice';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { clearChat } from '@/redux/chatSlice';

const useCreateSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleNewSwarm = (swarm: Swarm, user: UserState) => {
        dispatch(setSwarm(swarm));
        dispatch(setUser(user));
        dispatch(clearChat());
    };

    const handleCreateSwarm = async (newSwarmName: string) => {
        try {
            const response = await fetch('/api/swarm/create_swarm', {
                method: 'POST',
                body: JSON.stringify({ swarm_name: newSwarmName }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                handleNewSwarm(data.swarm, data.user);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        } catch (error) {
            console.error("Error creating swarm:", error);
            throw error;
        }
    };

    return { handleCreateSwarm };
};

export default useCreateSwarm;


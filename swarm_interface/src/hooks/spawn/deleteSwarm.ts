import { useDispatch, useSelector } from 'react-redux';
import { setSwarm, SwarmState } from '@/redux/swarmSlice';
import { setUser, UserState } from '@/redux/userSlice';
import { clearMessages } from '@/redux/chatSlice';
import { RootStateType } from '@models/rootstate';

const useDeleteSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const updateUserSwarms = (swarm: SwarmState, user: UserState) => {
        dispatch(setSwarm(swarm));
        dispatch(setUser(user));
        dispatch(clearMessages());
    };

    const handleDeleteSwarm = async (swarm_id: string) => {
        try {
            const response = await fetch('/api/spawn/delete_swarm', {
                method: 'DELETE',
                body: JSON.stringify({ swarm_id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                updateUserSwarms(data.swarm, data.user);
            } else {
                throw new Error('Deleting swarm failed due to server error');
            }
        } catch (error) {
            console.error("Error creating swarm:", error);
            throw error;
        }
    };

    return { handleDeleteSwarm };
};

export default useDeleteSwarm;


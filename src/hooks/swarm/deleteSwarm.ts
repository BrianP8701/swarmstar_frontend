import { useDispatch, useSelector } from 'react-redux';
import { setSwarm, Swarm } from '@/redux/swarmSlice';
import { setUser, UserState } from '@/redux/userSlice';
import { clearChat } from '@/redux/chatSlice';
import { RootStateType } from '@models/rootstate';

const useDeleteSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const updateUserSwarms = (swarm: Swarm, user: UserState) => {
        dispatch(setSwarm(swarm));
        dispatch(setUser(user));
        dispatch(clearChat());
    };

    const handleDeleteSwarm = async (swarm_id: string) => {
        try {
            const response = await fetch(`/api/swarm/delete_swarm?swarm_id=${swarm_id}`, {
                method: 'DELETE',
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
            console.error("Error deleting swarm:", error);
            throw error;
        }
    };

    return { handleDeleteSwarm };
};

export default useDeleteSwarm;


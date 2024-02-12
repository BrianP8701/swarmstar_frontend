import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSwarm, setUserSwarms } from '@/redux/userSlice';
import { RootStateType } from '@models/rootstate';

const useDeleteSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.user.token);

    const updateUserSwarms = (swarm_ids: string[], swarm_names: { [swarm_id: string]: string }) => {
        console.log('swarm_names:', swarm_names);
        dispatch(setUserSwarms({ swarm_ids, swarm_names }));
        dispatch(setCurrentSwarm(''));
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
                updateUserSwarms(data.user_swarms.swarm_ids, data.user_swarms.swarm_names);
            } else {
                throw new Error('Creating swarm failed due to server error');
            }
        } catch (error) {
            console.error("Error creating swarm:", error);
            throw error;
        }
    };

    return { handleDeleteSwarm };
};

export default useDeleteSwarm;


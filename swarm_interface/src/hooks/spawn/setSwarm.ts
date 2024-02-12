import { useDispatch, useSelector } from 'react-redux';
import { setSwarm } from '@/redux/swarmSlice';
import { setCurrentSwarm } from '@/redux/userSlice';
import { RootStateType } from '@models/rootstate';

const useSetSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.user.token);


    const handleSwarm = (swarm_id: string, swarm_name: string, goal: string, spawned: boolean) => {
        dispatch(setSwarm({ swarm_id, swarm_name, goal, spawned })); 1
        dispatch(setCurrentSwarm(swarm_id));
    };

    const handleSetSwarm = async (swarm_id: string) => {
        try {
            const response = await fetch('/api/spawn/getSwarm', {
                method: 'POST',
                body: JSON.stringify({ swarm_id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('YAYYYYY WE MADE IT HERE!!!!!')
                handleSwarm(data.swarm_id, data.name, data.goal, data.spawned);
                console.log("no way we make it here.....")
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        } catch (error) {
            console.error("Error creating swarm:", error);
            throw error;
        }
    };

    return { handleSetSwarm };
};

export default useSetSwarm;

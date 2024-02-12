/*
    This hook will create a new empty swarm in the backend and update the redux store with the 
    addition of the new swarm's information.
*/
import { useDispatch } from 'react-redux';
import { setSwarm } from '@/redux/swarmSlice';
import { setCurrentSwarm, setUserSwarms } from '@/redux/userSlice';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const useCreateSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.user.token);

    const handleNewSwarm = (swarm_id: string, swarm_name: string, goal: string, spawned: boolean, swarm_ids: string[], swarm_names: { [swarm_id: string]: string }) => {
        dispatch(setSwarm({ swarm_id, swarm_name, goal, spawned }));
        dispatch(setUserSwarms({ swarm_ids, swarm_names }))
        dispatch(setCurrentSwarm(swarm_id));
    };

    const handleCreateSwarm = async (newSwarmName: string) => {
        console.log("newSwarmName: \n\n", newSwarmName)
        try {
            const response = await fetch('/api/spawn/createSwarm', {
                method: 'POST',
                body: JSON.stringify({ swarm_name: newSwarmName }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                handleNewSwarm(data.swarm_id, data.name, data.goal, data.spawned, data.user_swarms.swarm_ids, data.user_swarms.swarm_names);
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


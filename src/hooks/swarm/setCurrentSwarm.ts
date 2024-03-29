import { useDispatch, useSelector } from 'react-redux';
import { setSwarm, Swarm } from '@/redux/swarmSlice';
import { setUser, UserState } from '@/redux/userSlice';
import { RootStateType } from '@models/rootstate';
import { clearChat } from '@/redux/chatSlice';
import { SwarmNode, setSwarmTree } from "@/redux/treeSlice";

const useSetCurrentSwarm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleResponse = (swarm: Swarm, user: UserState, swarm_tree: SwarmNode) => {
        dispatch(setSwarm(swarm));
        dispatch(setUser(user));
        dispatch(setSwarmTree(swarm_tree))
        dispatch(clearChat());
    };

    const handleSetCurrentSwarm = async (swarm_id: string) => {
        try {
            const response = await fetch('/api/swarm/set_current_swarm', {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({ swarm_id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();

            if (response.ok) {
                handleResponse(data.swarm, data.user, data.swarm_tree);
            } else {
                return data.error;
            }
        } catch (error) {
            console.error("Error setting swarm:", error);
            throw error;
        }
    };

    return { handleSetCurrentSwarm };
};

export default useSetCurrentSwarm;

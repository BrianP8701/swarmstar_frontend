import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { setNodeLogs, NodeLog } from '@/redux/treeSlice';
import { setCurrentNodeID } from '@/redux/userSlice';

const useSetCurrentNode = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleResponse = (node_id: string, node_logs: NodeLog[]) => {
        dispatch(setCurrentNodeID(node_id));
        dispatch(setNodeLogs(node_logs));
    }

    const setCurrentNode = async (node_id: string) => {
        try {
            const response = await fetch('/api/tree/set_current_node', {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({ node_id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();

            if (response.ok) {
                handleResponse(node_id, data.node_logs);
            } else {
                return data.error;
            }
        } catch (error) {
            console.error("Error setting swarm:", error);
            throw error;
        }
    };

    return { setCurrentNode };
};

export default useSetCurrentNode;
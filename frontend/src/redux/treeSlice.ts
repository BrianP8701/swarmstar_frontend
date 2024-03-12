import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SwarmNode {
    name: string;
    attributes: {
        directive: string;
        node_id: string;
        status: string;
    };
    children?: SwarmNode[];
}

interface NodeLog {
    role: string;
    content: string;
}

type NodeLogList = NodeLog | NodeLog[] | NodeLogList[];

interface SwarmTree {
    swarmState: SwarmNode | null;
    node_logs: unknown[]; // This should be NodeLogList, but it's infinitely recursive so it's not possible to define it here
}

interface AddNodePayload {
    parentNodeId?: string | null;
    newNode: SwarmNode;
}

interface UpdateNodeStatusPayload {
    nodeId: string;
    status: 'terminated' | 'active' | 'waiting';
}

const initialState: SwarmTree = {
    swarmState: null,
    node_logs: []
};

const swarmTreeSlice = createSlice({
    name: 'swarmTree',
    initialState,
    reducers: {
        setSwarmTree: (state, action: PayloadAction<SwarmNode | null>) => {
            state.swarmState = action.payload;
        },
        setNodeLogs: (state, action: PayloadAction<NodeLog[]>) => {
            state.node_logs = action.payload;
        },
        addNode: (state, action: PayloadAction<AddNodePayload>) => {
            const { parentNodeId, newNode } = action.payload;

            console.log("addNodePayload", action.payload);

            const addNodeRecursive = (node: SwarmNode | null): boolean => {
                if (node === null) return false;

                if (node.attributes.node_id === parentNodeId) {
                    if (node.children) {
                        node.children.push(newNode);
                    } else {
                        node.children = [newNode];
                    }
                    return true;
                }

                if (node.children) {
                    for (const child of node.children) {
                        if (addNodeRecursive(child)) {
                            return true;
                        }
                    }
                }

                return false;
            };

            if (parentNodeId === undefined || parentNodeId === null) {
                // If parentNodeId is not provided or is null, set the new node as the root
                if (state.swarmState === null) {
                    state.swarmState = newNode;
                } else {
                    // If a root node already exists, add the new node as a child of the root
                    if (state.swarmState.children) {
                        state.swarmState.children.push(newNode);
                    } else {
                        state.swarmState.children = [newNode];
                    }
                }
            } else {
                // Otherwise, find the parent node and add the new node as its child
                if (!addNodeRecursive(state.swarmState)) {
                    console.error(`Parent node with ID ${parentNodeId} not found.`);
                }
            }
        },
        updateNodeStatus: (state, action: PayloadAction<UpdateNodeStatusPayload>) => {
            const { nodeId, status } = action.payload;

            const updateStatusRecursive = (node: SwarmNode | null): boolean => {
                if (node === null) return false;

                if (node.attributes.node_id === nodeId) {
                    node.attributes.status = status;
                    return true;
                }

                if (node.children) {
                    for (const child of node.children) {
                        if (updateStatusRecursive(child)) {
                            return true;
                        }
                    }
                }

                return false;
            };

            updateStatusRecursive(state.swarmState);
        },
    },
});

export const { setSwarmTree, addNode, setNodeLogs, updateNodeStatus } = swarmTreeSlice.actions;
export default swarmTreeSlice.reducer;
export type { SwarmTree, SwarmNode, AddNodePayload, NodeLog, NodeLogList, UpdateNodeStatusPayload};


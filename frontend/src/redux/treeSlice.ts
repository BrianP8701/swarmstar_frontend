import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SwarmNode {
    name: string;
    attributes: {
        directive: string;
        node_id: string;
    };
    children?: SwarmNode[];
}

interface SwarmTree {
    swarmState: SwarmNode | null;
}

interface AddNodePayload {
    parentNodeId?: string | null;
    newNode: SwarmNode;
}

const initialState: SwarmTree = {
    swarmState: null,
};

const swarmTreeSlice = createSlice({
    name: 'swarmTree',
    initialState,
    reducers: {
        setSwarmTree: (state, action: PayloadAction<SwarmNode | null>) => {
            console.log('setSwarmTree:', action.payload)
            state.swarmState = action.payload;
        },
        addNode: (state, action: PayloadAction<AddNodePayload>) => {
            const { parentNodeId, newNode } = action.payload;

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
                state.swarmState = newNode;
            } else {
                // Otherwise, find the parent node and add the new node as its child
                addNodeRecursive(state.swarmState);
            }
        },
    },
});

export const { setSwarmTree, addNode } = swarmTreeSlice.actions;
export default swarmTreeSlice.reducer;
export type { SwarmTree, SwarmNode, AddNodePayload };
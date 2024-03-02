// nodeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SwarmNode = {
    node_id: string;
    parent_id?: string | null;
    children_ids: string[];
    action_id: string;
    message: string;
    alive: boolean;
    termination_policy: "simple" | "parallel_review" | "clone_with_questions_answered";
    developer_logs: Array<Record<string, any>>;
    journal: Array<Record<string, any>>;
    report?: string | null;
}

interface SwarmState {
  nodes: { [node_id: string]: SwarmNode };
}

const initialState: SwarmState = {
  nodes: {},
};

const swarmStateSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<{ nodes: { [node_id: string]: SwarmNode } }>) => {
      state.nodes = action.payload.nodes;
    },
    addNode: (state, action: PayloadAction<SwarmNode>) => {
      state.nodes[action.payload.node_id] = action.payload;
    },
    updateNode: (state, action: PayloadAction<SwarmNode>) => {
      state.nodes[action.payload.node_id] = action.payload;
    }
  },
});

export const { setNodes, addNode, updateNode } = swarmStateSlice.actions;
export default swarmStateSlice.reducer;
export type { SwarmState };

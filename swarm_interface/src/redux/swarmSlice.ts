// swarmSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SwarmState {
  name: string;
  goal: string;
  spawned: boolean;
  active: boolean;
  conversation_ids: string[];
  conversation_names: { [conversation_id: string]: string };
  live_conversations_ids: string[];
  terminated_conversations_ids: string[];
  nodes: string[];
  root_node_id: string;
  frames: number;
}

const initialState: SwarmState = {
  name: '',
  goal: '',
  spawned: false,
  active: false,
  conversation_ids: [],
  conversation_names: {},
  live_conversations_ids: [],
  terminated_conversations_ids: [],
  nodes: [],
  root_node_id: '',
  frames: 0
};

const swarmSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSwarm: (state, action: PayloadAction<{ swarm_data: SwarmState }>) => {
      state.name = action.payload.swarm_data.name;
      state.goal = action.payload.swarm_data.goal;
      state.spawned = action.payload.swarm_data.spawned;
      state.active = action.payload.swarm_data.active;
      state.conversation_ids = action.payload.swarm_data.conversation_ids;
      state.conversation_names = action.payload.swarm_data.conversation_names;
      state.live_conversations_ids = action.payload.swarm_data.live_conversations_ids;
      state.terminated_conversations_ids = action.payload.swarm_data.terminated_conversations_ids;
      state.nodes = action.payload.swarm_data.nodes;
      state.root_node_id = action.payload.swarm_data.root_node_id;
      state.frames = action.payload.swarm_data.frames;
    }
  },
});

export const { setSwarm } = swarmSlice.actions;
export default swarmSlice.reducer;

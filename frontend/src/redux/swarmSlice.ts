// swarmSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Swarm {
  swarm_id: string;
  name: string;
  goal: string;
  spawned: boolean;
  active: boolean;
  chat_ids: { [chat_id: string]: string };
  live_chat_ids: string[];
  terminated_chat_ids: string[];
  root_node_id: string;
  node_ids: string[];
  frames: number;
  owner: string;
  queued_swarm_operations_ids: string[];
}

const initialState: Swarm = {
  swarm_id: '',
  name: '',
  goal: '',
  spawned: false,
  active: false,
  chat_ids: {},
  live_chat_ids: [],
  terminated_chat_ids: [],
  root_node_id: '',
  node_ids: [],
  frames: 0,
  owner: '',
  queued_swarm_operations_ids: [],
};

const swarmSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSwarm: (state, action: PayloadAction<Swarm>) => {
      state.swarm_id = action.payload.swarm_id;
      state.name = action.payload.name;
      state.goal = action.payload.goal;
      state.spawned = action.payload.spawned;
      state.active = action.payload.active;
      state.chat_ids = action.payload.chat_ids;
      state.live_chat_ids = action.payload.live_chat_ids;
      state.terminated_chat_ids = action.payload.terminated_chat_ids;
      state.root_node_id = action.payload.root_node_id;
      state.node_ids = action.payload.node_ids;
      state.frames = action.payload.frames;
      state.owner = action.payload.owner;
      state.queued_swarm_operations_ids = action.payload.queued_swarm_operations_ids;
    },
    setGoal: (state, action: PayloadAction<string>) => {
      state.goal = action.payload;
    }
  },
});

export const { setSwarm, setGoal } = swarmSlice.actions;
export default swarmSlice.reducer;
export type { Swarm };
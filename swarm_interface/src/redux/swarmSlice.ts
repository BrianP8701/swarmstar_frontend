// swarmSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SwarmState {
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
  swarm_operation_ids: string[];
}

const initialState: SwarmState = {
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
  swarm_operation_ids: [],
};

const swarmSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSwarm: (state, action: PayloadAction<SwarmState>) => {
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
      state.swarm_operation_ids = action.payload.swarm_operation_ids;
    },
    setGoal: (state, action: PayloadAction<string>) => {
      state.goal = action.payload;
    }
  },
});

export const { setSwarm, setGoal } = swarmSlice.actions;
export default swarmSlice.reducer;
export type { SwarmState };
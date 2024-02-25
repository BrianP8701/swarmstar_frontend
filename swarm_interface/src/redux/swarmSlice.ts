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
  node_ids: string[];
  frames: number;
  owner: string;
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
  node_ids: [],
  frames: 0,
  owner: ''
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
      state.node_ids = action.payload.node_ids;
      state.frames = action.payload.frames;
      state.owner = action.payload.owner;
    },
    setGoal: (state, action: PayloadAction<string>) => {
      state.goal = action.payload;
    }
  },
});

export const { setSwarm, setGoal } = swarmSlice.actions;
export default swarmSlice.reducer;
export type { SwarmState };
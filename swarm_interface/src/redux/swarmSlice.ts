// swarmSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SwarmState {
  name: string;
  goal: string;
  spawned: boolean;
  active: boolean;
  chat_ids: string[];
  chat_names: { [chat_id: string]: string };
  live_chat_ids: string[];
  terminated_chat_ids: string[];
  node_ids: string[];
  root_node_id: string;
  frames: number;
  owner: string;
}

const initialState: SwarmState = {
  name: '',
  goal: '',
  spawned: false,
  active: false,
  chat_ids: [],
  chat_names: {},
  live_chat_ids: [],
  terminated_chat_ids: [],
  node_ids: [],
  root_node_id: '',
  frames: 0,
  owner: ''
};

const swarmSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSwarm: (state, action: PayloadAction<SwarmState>) => {
      state.name = action.payload.name;
      state.goal = action.payload.goal;
      state.spawned = action.payload.spawned;
      state.active = action.payload.active;
      state.chat_ids = action.payload.chat_ids;
      state.chat_names = action.payload.chat_names;
      state.live_chat_ids = action.payload.live_chat_ids;
      state.terminated_chat_ids = action.payload.terminated_chat_ids;
      state.node_ids = action.payload.node_ids;
      state.root_node_id = action.payload.root_node_id;
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
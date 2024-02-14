// swarmSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SwarmState {
  name: string;
  goal: string;
  spawned: boolean;
  active: boolean;
  conversation_ids: string[];
  conversation_names: { [conversation_id: string]: string };
  live_conversation_ids: string[];
  terminated_conversation_ids: string[];
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
  live_conversation_ids: [],
  terminated_conversation_ids: [],
  nodes: [],
  root_node_id: '',
  frames: 0
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
      state.conversation_ids = action.payload.conversation_ids;
      state.conversation_names = action.payload.conversation_names;
      state.live_conversation_ids = action.payload.live_conversation_ids;
      state.terminated_conversation_ids = action.payload.terminated_conversation_ids;
      state.nodes = action.payload.nodes;
      state.root_node_id = action.payload.root_node_id;
      state.frames = action.payload.frames;
    },
    setGoal: (state, action: PayloadAction<string>) => {
      state.goal = action.payload;
    }
  },
});

export const { setSwarm } = swarmSlice.actions;
export default swarmSlice.reducer;
export type { SwarmState };
// swarmSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Swarm {
  id: string;
  name: string;
  goal: string;
  spawned: boolean;
  active: boolean;
  complete: boolean;
  nodes_with_active_chat: { [key: string]: string };
  nodes_with_terminated_chat: { [key: string]: string };
}

const initialState: Swarm = {
  id: '',
  name: '',
  goal: '',
  spawned: false,
  active: false,
  complete: false,
  nodes_with_active_chat: {},
  nodes_with_terminated_chat: {},
};

const swarmSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSwarm: (state, action: PayloadAction<Swarm>) => {
      if (action.payload == null) {
        state = initialState
      }
      else {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.goal = action.payload.goal;
        state.spawned = action.payload.spawned;
        state.active = action.payload.active;
        state.complete = action.payload.complete;
        state.nodes_with_active_chat = action.payload.nodes_with_active_chat;
        state.nodes_with_terminated_chat = action.payload.nodes_with_terminated_chat;
      };
    },
    setGoal: (state, action: PayloadAction<string>) => {
      state.goal = action.payload;
    }
  },
});

export const { setSwarm, setGoal } = swarmSlice.actions;
export default swarmSlice.reducer;
export type { Swarm };
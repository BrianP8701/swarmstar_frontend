// swarmSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SwarmState {
  swarm_id: string;
  swarm_name: string;
  goal: string;
  spawned: boolean;
}

const initialState: SwarmState = {
    swarm_id: '',
    swarm_name: '',
    goal: '',
    spawned: false
};

const swarmSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSwarmGoal: (state, action: PayloadAction<string>) => {
      state.goal = action.payload;
    },
    setSwarm: (state, action: PayloadAction<{swarm_id:string, swarm_name: string, goal: string, spawned: boolean }>) => {
      state.swarm_id = action.payload.swarm_id;
      state.swarm_name = action.payload.swarm_name;
      state.goal = action.payload.goal;
      state.spawned = action.payload.spawned;
    },
    setIsSpawned: (state, action: PayloadAction<boolean>) => {
      state.spawned = action.payload;
    }
  },
});

export const { setSwarmGoal, setSwarm, setIsSpawned } = swarmSlice.actions;
export default swarmSlice.reducer;

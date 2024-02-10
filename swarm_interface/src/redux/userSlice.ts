// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user_id: string;
  user_swarms: string[]; 
  current_goal: string;
  is_running: boolean;
  current_swarm: string | null; 
  token: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user_id: '',
  user_swarms: [],
  current_goal: '',
  is_running: false,
  current_swarm: null,
  token: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<{ user_id: string; user_swarms: string[] }>) => {
      state.user_id = action.payload.user_id;
      state.user_swarms = action.payload.user_swarms;
    },
    setCurrentSwarm: (state, action: PayloadAction<string>) => {
      state.current_swarm = action.payload;
    },
    setCurrentGoal: (state, action: PayloadAction<string>) => {
      state.current_goal = action.payload;
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.is_running = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },
});

export const { setUserLogin, setCurrentSwarm, setCurrentGoal, setIsRunning, setToken } = userSlice.actions;
export default userSlice.reducer;

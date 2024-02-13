// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  swarm_ids: string[];
  swarm_names: { [swarm_id: string]: string };
  current_swarm_id: string | null;
  current_conversation_id: string | null;
  token: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  swarm_ids: [],
  swarm_names: {},
  current_swarm_id: null,
  current_conversation_id: null,
  token: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSwarms: (state, action: PayloadAction<{ swarm_ids: string[]; swarm_names: { [swarm_id: string]: string } }>) => {
      state.swarm_ids = action.payload.swarm_ids;
      state.swarm_names = action.payload.swarm_names;
    },
    setCurrentSwarmID: (state, action: PayloadAction<string>) => {
      state.current_swarm_id = action.payload;
    },
    setCurrentConversationID: (state, action: PayloadAction<string>) => {
      state.current_conversation_id = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },
});

export const { setUserSwarms, setCurrentSwarmID, setCurrentConversationID, setToken } = userSlice.actions;
export default userSlice.reducer;

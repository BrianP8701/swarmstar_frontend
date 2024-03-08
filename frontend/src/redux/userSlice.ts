// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  username: string;
  swarm_ids: { [swarm_id: string]: string };
  current_swarm_id: string;
  current_chat_id: string;
  current_node_id: string;
}

// Define the initial state using that type
const initialState: UserState = {
  id: '',
  username: '',
  swarm_ids: {},
  current_swarm_id: '',
  current_chat_id: '',
  current_node_id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSwarms: (state, action: PayloadAction<{ swarm_ids: { [swarm_id: string]: string } }>) => {
      state.swarm_ids = action.payload.swarm_ids;
    },
    setCurrentSwarmID: (state, action: PayloadAction<string>) => {
      state.current_swarm_id = action.payload;
    },
    setCurrentChatID: (state, action: PayloadAction<string>) => {
      state.current_chat_id = action.payload;
    },
    setCurrentNodeID: (state, action: PayloadAction<string>) => {
      state.current_node_id = action.payload;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.swarm_ids = action.payload.swarm_ids;
      state.current_swarm_id = action.payload.current_swarm_id;
      state.current_chat_id = action.payload.current_chat_id;
      state.current_node_id = action.payload.current_node_id;
    },
  },
});

export const { setUserSwarms, setCurrentSwarmID, setCurrentChatID, setCurrentNodeID, setUser,  } = userSlice.actions;
export default userSlice.reducer;
export type { UserState };


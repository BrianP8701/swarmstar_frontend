// chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Message = {
  role: string;
  message: string;
};

type MessagesList = Message[];

interface chatState {
  active_agents: string[];
  dead_agents: string[];
  agent_names: { [agent_id: string]: string };
  current_agent: string | null;
  current_agent_messages: MessagesList; 
}

// Define the initial state using that type
const initialState: chatState = {
  active_agents: [],
  dead_agents: [],
  agent_names: {},
  current_agent: null,
  current_agent_messages: []
};

const chatSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<{ active_agents: string[]; dead_agents: string[]; agent_names: { [agent_id: string]: string } }>) => {
      state.active_agents = action.payload.active_agents;
      state.dead_agents = action.payload.dead_agents;
      state.agent_names = action.payload.agent_names;
    },
    setCurrentAgent: (state, action: PayloadAction<string>) => {
      state.current_agent = action.payload;
    },
    setCurrentAgentMessages: (state, action: PayloadAction<MessagesList>) => {
      state.current_agent_messages = action.payload;
    }
  },
});

export const { setAgents, setCurrentAgent, setCurrentAgentMessages } = chatSlice.actions;
export default chatSlice.reducer;

// chat.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
    messages: [string, string][];
    alive: boolean;
    owner: string;
};


// Define the initial state using that type
const initialState: ChatState = {
    messages: [],
    alive: false,
    owner: ''
};

const chatSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setChat: (state, action: PayloadAction<ChatState>) => {
            state.messages = action.payload.messages;
            state.alive = action.payload.alive;
            state.owner = action.payload.owner;
        },
        addMessage: (state, action: PayloadAction<[string, string]>) => {
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        }
    },
});

export const { setChat, addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
export type { ChatState };
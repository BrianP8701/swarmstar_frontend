// chat.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface chatState {
    messages: [string, string][];
    alive: boolean;
};


// Define the initial state using that type
const initialState: chatState = {
    messages: [],
    alive: false
};

const chatSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setChat: (state, action: PayloadAction<{ messages: [string, string][]; alive: boolean }>) => {
            state.messages = action.payload.messages;
            state.alive = action.payload.alive;
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

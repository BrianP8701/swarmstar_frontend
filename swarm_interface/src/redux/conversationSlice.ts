// conversation.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface conversationState {
    messages: [string, string][];
};


// Define the initial state using that type
const initialState: conversationState = {
    messages: [],
};

const conversationSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<{ messages: [string, string][] }>) => {
            state.messages = action.payload.messages;
        },
        addMessage: (state, action: PayloadAction<[string, string]>) => {
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        }
    },
});

export const { setMessages, addMessage, clearMessages } = conversationSlice.actions;
export default conversationSlice.reducer;

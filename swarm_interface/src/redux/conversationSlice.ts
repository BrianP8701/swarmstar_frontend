// conversation.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConversationState {
    messages: [string, string][];
    alive: boolean;
};


// Define the initial state using that type
const initialState: ConversationState = {
    messages: [],
    alive: false
};

const conversationSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setConversation: (state, action: PayloadAction<{ messages: [string, string][]; alive: boolean }>) => {
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

export const { setConversation, addMessage, clearMessages } = conversationSlice.actions;
export default conversationSlice.reducer;

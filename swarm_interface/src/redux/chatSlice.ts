// chat.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
    role: string;
    content: string;
}

interface ChatState {
    messages: Message[];
    alive: boolean;
    owner: string;
};

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
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
        clearMessages: (state) => {
            state.messages = [];
        }
    },
});

export const { setChat, addMessage, clearMessages, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
export type { ChatState };
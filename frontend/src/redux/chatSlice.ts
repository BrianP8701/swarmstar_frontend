// chat.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
    id: string;
    role: string;
    content: string;
}

interface ChatState {
    id: string;
    messages: Message[];
    journal: { [key: string]: any };
    alive: boolean;
};

const initialState: ChatState = {
    id: '',
    messages: [],
    journal: {},
    alive: false,
};

const chatSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setChat: (state, action: PayloadAction<ChatState>) => {
            state.id = action.payload.id;
            state.messages = action.payload.messages;
            state.alive = action.payload.alive;
            state.journal = action.payload.journal;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
        clearMessages: (state) => {
            state.messages = [];
        },
        clearChat: (state) => {
            state.id = '';
            state.messages = [];
            state.alive = false;
            state.journal = {};
        }
    },
});

export const { setChat, addMessage, clearMessages, setMessages, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
export type { ChatState };
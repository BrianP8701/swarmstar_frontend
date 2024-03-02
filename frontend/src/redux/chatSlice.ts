// chat.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
    role: string;
    content: string;
}

interface ChatState {
    messages: Message[];
    alive: boolean;
    node_id: string;
    owner: string;
    user_communication_operation: any;
};

const initialState: ChatState = {
    messages: [],
    alive: false,
    node_id: '',
    owner: '',
    user_communication_operation: {},
};

const chatSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setChat: (state, action: PayloadAction<ChatState>) => {
            state.messages = action.payload.messages;
            state.alive = action.payload.alive;
            state.node_id = action.payload.node_id;
            state.owner = action.payload.owner;
            state.user_communication_operation = action.payload.user_communication_operation;
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
            state.messages = [];
            state.alive = false;
            state.node_id = '';
            state.owner = '';
            state.user_communication_operation = '';
        }
    },
});

export const { setChat, addMessage, clearMessages, setMessages, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
export type { ChatState };
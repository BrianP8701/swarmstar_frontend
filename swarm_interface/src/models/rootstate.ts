// Define interfaces for each slice's state based on your existing code

interface UserState {
    user_id: string;
    user_swarms: string[];
    current_goal: string;
    is_running: boolean;
    current_swarm: string | null;
    token: string | null;
}

interface ChatState {
    active_agents: string[];
    dead_agents: string[];
    agent_names: { [agent_id: string]: string };
    current_agent: string | null;
    current_agent_messages: {
        role: string;
        message: string;
    }[];
}

// Define the RootState type which represents the entire Redux state
interface RootStateType {
    user: UserState;
    chat: ChatState;
}

export type { RootStateType, UserState, ChatState };
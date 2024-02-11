// Define interfaces for each slice's state based on your existing code

interface UserState {
    user_id: string;
    user_swarms: string[];
    swarm_names: { [swarm_id: string]: string };
    current_goal: string;
    is_running: boolean;
    current_swarm: string | null;
    token: string | null;
}

interface AgentsState {
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
    agents: AgentsState;
}

export type { RootStateType, UserState, AgentsState };
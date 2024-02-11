// Define interfaces for each slice's state based on your existing code

interface UserState {
    swarm_ids: string[];
    swarm_names: { [swarm_id: string]: string };
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

interface SwarmState {
    swarm_id: string;
    swarm_name: string;
    goal: string;
    spawned: boolean;
  }

// Define the RootState type which represents the entire Redux state
interface RootStateType {
    user: UserState;
    agents: AgentsState;
    swarm: SwarmState;
}

export type { RootStateType, UserState, AgentsState };
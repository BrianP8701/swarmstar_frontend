// Define interfaces for each slice's state based on your existing code

interface UserState {
  swarm_ids: string[];
  swarm_names: { [swarm_id: string]: string };
  current_swarm_id: string | null;
  current_conversation_id: string | null;
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
  name: string;
  goal: string;
  spawned: boolean;
  active: boolean;
  conversation_ids: string[];
  conversation_names: { [conversation_id: string]: string };
  live_conversation_ids: string[];
  terminated_conversation_ids: string[];
  nodes: string[];
  root_node_id: string;
  frames: number;
}

interface TokenState {
  token: string | null;
}

interface ConversationState {
  messages: [string, string][];
  alive: boolean;
};

// Define the RootState type which represents the entire Redux state
interface RootStateType {
  user: UserState;
  conversation: ConversationState;
  swarm: SwarmState;
  token: TokenState;
}

export type { RootStateType, UserState, AgentsState, ConversationState };
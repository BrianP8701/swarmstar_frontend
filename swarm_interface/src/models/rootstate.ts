// Define interfaces for each slice's state based on your existing code

interface UserState {
  swarm_ids: string[];
  swarm_names: { [swarm_id: string]: string };
  current_swarm_id: string | null;
  current_chat_id: string | null;
}

interface SwarmState {
  name: string;
  goal: string;
  spawned: boolean;
  active: boolean;
  chat_ids: string[];
  chat_names: { [chat_id: string]: string };
  live_chat_ids: string[];
  terminated_chat_ids: string[];
  nodes: string[];
  root_node_id: string;
  frames: number;
}

interface TokenState {
  token: string | null;
}

interface ChatState {
  messages: [string, string][];
  alive: boolean;
};

// Define the RootState type which represents the entire Redux state
interface RootStateType {
  user: UserState;
  chat: ChatState;
  swarm: SwarmState;
  token: TokenState;
}

export type { RootStateType, UserState, TokenState, ChatState };
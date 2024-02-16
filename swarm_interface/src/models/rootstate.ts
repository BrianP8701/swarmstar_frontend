import { UserState } from '@redux/userSlice';
import { ChatState } from '@redux/chatSlice';
import { SwarmState } from '@redux/swarmSlice';
import { TokenState } from '@redux/tokenSlice';

interface RootStateType {
  user: UserState;
  chat: ChatState;
  swarm: SwarmState;
  token: TokenState;
}

export type { RootStateType, UserState, TokenState, ChatState, SwarmState };


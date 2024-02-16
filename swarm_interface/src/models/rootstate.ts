import UserState from '@redux/userSlice';
import ChatState from '@redux/chatSlice';
import SwarmState from '@redux/swarmSlice';
import TokenState from '@redux/tokenSlice';

interface RootStateType {
  user: typeof UserState;
  chat: typeof ChatState;
  swarm: typeof SwarmState;
  token: typeof TokenState;
}

export type { RootStateType, UserState, TokenState, ChatState, SwarmState };


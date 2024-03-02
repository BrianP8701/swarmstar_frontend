import { UserState } from '@redux/userSlice';
import { ChatState } from '@redux/chatSlice';
import { Swarm } from '@redux/swarmSlice';
import { TokenState } from '@redux/tokenSlice';
import { SwarmHistory } from '@redux/swarmHistorySlice';
import { SwarmState } from '@redux/swarmStateSlice';

interface RootStateType {
  user: UserState;
  chat: ChatState;
  swarm: Swarm;
  swarmHistory: SwarmHistory;
  swarmState: SwarmState;
  token: TokenState;
}

export type { RootStateType, UserState, TokenState, ChatState, SwarmState, SwarmHistory, Swarm };


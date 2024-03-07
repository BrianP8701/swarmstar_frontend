import { UserState } from '@redux/userSlice';
import { ChatState } from '@redux/chatSlice';
import { Swarm } from '@redux/swarmSlice';
import { TokenState } from '@redux/tokenSlice';
import { SwarmTree } from '@redux/treeSlice';

interface RootStateType {
  user: UserState;
  chat: ChatState;
  swarm: Swarm;
  token: TokenState;
  tree: SwarmTree;
}

export type { RootStateType, UserState, TokenState, ChatState, Swarm, SwarmTree };

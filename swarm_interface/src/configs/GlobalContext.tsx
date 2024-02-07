// src/GlobalContext.tsx
import React, { useState, useEffect } from 'react';
import { User } from '@models/user';
import { Agents } from '@models/agents';

interface GlobalContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  agents: Agents;
  setAgents: React.Dispatch<React.SetStateAction<Agents>>;
}

const defaultUser: User = {
  currentSwarm: null,
  username: '',
  userSwarms: [],
  currentSection: '',
  currentGoal: '',
  isRunning: false
};

const defaultAgent: Agents = {
  all_agents: [],
  currentAgent: null,
  currentGoal: ''
};

const defaultGlobalContextValues: GlobalContextProps = {
  user: defaultUser,
  setUser: () => { },
  agents: defaultAgent,
  setAgents: () => { }
};

export const GlobalContext = React.createContext<GlobalContextProps>(defaultGlobalContextValues);

// MAX LENGTH OF AGENT NAME IS 15 CHARACTERS

export const GlobalProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [agents, setAgents] = useState<Agents>(defaultAgent);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('agents', JSON.stringify(agents));
  }, [user, agents]);

  return (
    <GlobalContext.Provider value={{
      user, setUser,
      agents, setAgents
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

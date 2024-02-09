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
  all_agents: ['Agent1', 'Agent2', 'Agent3', 'Agent4', 'Agent5', 'Agent6asbdjsajkdbsjkbd', 'Agent7', 'Agent8', 'Agent9', 'Agent10', 'Agent11', 'Agent12', 'Agent13', 'Agent14', 'Agent15', 'Agent16', 'Agent17', 'Agent18', 'Agent20', 'Agent21'],
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



export const GlobalProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });
  // MAX LENGTH OF AGENT NAME IS 15 CHARACTERS
  const [agents, setAgents] = useState<Agents>(() => {
    const savedAgents = localStorage.getItem('agents');
    return savedAgents ? JSON.parse(savedAgents) : defaultAgent;
  });

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

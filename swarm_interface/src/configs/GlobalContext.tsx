import React, { useState, useEffect } from 'react';
import { User } from '@models/user';
import { Agents } from '@models/agents';

interface GlobalContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  agents: Agents;
  setAgents: React.Dispatch<React.SetStateAction<Agents>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
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

const defaultCurrentPage: string = '/spawn';

const defaultGlobalContextValues: GlobalContextProps = {
  user: defaultUser,
  setUser: () => { },
  agents: defaultAgent,
  setAgents: () => { },
  currentPage: defaultCurrentPage,
  setCurrentPage: () => { }
};

export const GlobalContext = React.createContext<GlobalContextProps>(defaultGlobalContextValues);

export const GlobalProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // Initialize state without attempting to access localStorage
  const [user, setUser] = useState<User>(defaultUser);
  const [agents, setAgents] = useState<Agents>(defaultAgent);
  const [currentPage, setCurrentPage] = useState<string>(defaultCurrentPage);

  useEffect(() => {
    // Now that we are client-side, it's safe to access localStorage
    const savedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedAgents = typeof window !== 'undefined' ? localStorage.getItem('agents') : null;
    if (savedAgents) {
      setAgents(JSON.parse(savedAgents));
    }

    let savedCurrentPage = typeof window !== 'undefined' ? localStorage.getItem('currentPage') : defaultCurrentPage;
    if (!savedCurrentPage) {
      savedCurrentPage = defaultCurrentPage;
    }
    setCurrentPage(savedCurrentPage);
  }, []);

  useEffect(() => {
    // Save to localStorage when user or agents state changes, client-side only
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('agents', JSON.stringify(agents));
      // No need to save currentPage here as it's being handled in _app.tsx
    }
  }, [user, agents]);

  return (
    <GlobalContext.Provider value={{
      user, setUser,
      agents, setAgents,
      currentPage, setCurrentPage
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

// src/GlobalContext.tsx
import React, { useState, useEffect } from 'react';

interface GlobalContextProps {
  swarmKey: string;
  setSwarmKey: React.Dispatch<React.SetStateAction<string>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  currentGoal: string;
  setCurrentGoal: React.Dispatch<React.SetStateAction<string>>;
  agents: string[];
  setAgents: React.Dispatch<React.SetStateAction<string[]>>;
}

export const GlobalContext = React.createContext<GlobalContextProps | undefined>({} as GlobalContextProps);

export const GlobalProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [swarmKey, setSwarmKey] = useState(localStorage.getItem('swarmKey') || '');
  const [currentGoal, setCurrentGoal] = useState(localStorage.getItem('currentGoal') || '');
  const [isRunning, setIsRunning] = useState(false);
  const [agents, setAgents] = useState<string[]>(['agent1', 'agent2', 'agent3']);

  useEffect(() => {
      localStorage.setItem('swarmKey', swarmKey);
      localStorage.setItem('currentGoal', currentGoal);
  }, [swarmKey, currentGoal]);

  return (
      <GlobalContext.Provider value={{ swarmKey, setSwarmKey, currentGoal, setCurrentGoal, isRunning, setIsRunning, agents, setAgents }}>
      {children}
      </GlobalContext.Provider>
  );
};

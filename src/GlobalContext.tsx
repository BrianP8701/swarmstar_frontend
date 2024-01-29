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
  selectedAgent: string;
  setSelectedAgent: React.Dispatch<React.SetStateAction<string>>;
  currentSection: string;
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
}

const defaultGlobalContextValues: GlobalContextProps = {
  swarmKey: '',
  setSwarmKey: () => {}, // Placeholder function
  isRunning: false,
  setIsRunning: () => {}, // Placeholder function
  currentGoal: '',
  setCurrentGoal: () => {}, // Placeholder function
  agents: [],
  setAgents: () => {}, // Placeholder function
  selectedAgent: '',
  setSelectedAgent: () => {}, // Placeholder function
  currentSection: '',
  setCurrentSection: () => {}, // Placeholder function
};

export const GlobalContext = React.createContext<GlobalContextProps>(defaultGlobalContextValues);

// MAX LENGTH OF AGENT NAME IS 15 CHARACTERS

export const GlobalProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [swarmKey, setSwarmKey] = useState(localStorage.getItem('swarmKey') || '');
  const [currentGoal, setCurrentGoal] = useState(localStorage.getItem('currentGoal') || '');
  const [isRunning, setIsRunning] = useState(localStorage.getItem('isRunning') === 'true');
  const [agents, setAgents] = useState<string[]>(['agent1', 'agent2', 'agent3', 'agent4', 'agent5', 'agent6', 'agent7', 'agent8', 'agent9', 'agent10', 'agent11', 'agent12', 'agent13', 'agent14', 'agent15', 'agent16', 'agent17', 'agent18', 'agent19', 'agent20', 'agent21', 'agent22', 'agent23', 'agent24', 'agent25', 'agent26', 'agent27', 'agent28', 'agent29', 'agent30']);
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [currentSection, setCurrentSection] = useState<string>('Spawn');

  useEffect(() => {
      localStorage.setItem('swarmKey', swarmKey);
      localStorage.setItem('currentGoal', currentGoal);
      localStorage.setItem('isRunning', isRunning.toString());
      localStorage.setItem('agents', agents.toString());
      localStorage.setItem('selectedAgent', selectedAgent);
      localStorage.setItem('currentSection', currentSection);
  }, [swarmKey, currentGoal, isRunning, agents, selectedAgent, currentSection]);

  return (
      <GlobalContext.Provider value={{ 
        swarmKey, setSwarmKey, 
        currentGoal, setCurrentGoal, 
        isRunning, setIsRunning, 
        agents, setAgents, 
        selectedAgent, setSelectedAgent,
        currentSection, setCurrentSection
         }}>
      {children}
      </GlobalContext.Provider>
  );
};

// src/GlobalContext.tsx
import React, { createContext, useState } from 'react';

interface GlobalContextProps {
  swarmKey: string;
  setSwarmKey: React.Dispatch<React.SetStateAction<string>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  currentGoal: string;
  setCurrentGoal: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = React.createContext<GlobalContextProps | undefined>({} as GlobalContextProps);

export const GlobalProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [swarmKey, setSwarmKey] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [currentGoal, setCurrentGoal] = useState('');

    return (
        <GlobalContext.Provider value={{ swarmKey, setSwarmKey, isRunning, setIsRunning, currentGoal, setCurrentGoal }}>
        {children}
        </GlobalContext.Provider>
    );
};
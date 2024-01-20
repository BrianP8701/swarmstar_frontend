// src/components/Spawn/index.tsx
import { GlobalContext } from '../../GlobalContext';
import { postToGCF } from '../../api';
import React, { useState, useContext } from 'react';

const Spawn = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        // handle the error, e.g., by throwing an exception or returning null
        throw new Error('GlobalContext is undefined, ensure the GlobalProvider is in the component tree above Spawn');
    }
    const { swarmKey = '', setSwarmKey, setIsRunning, currentGoal, setCurrentGoal } = context;
    const [goal, setGoal] = useState('');

    const spawn = async () => {
        try {
          const response = await postToGCF(swarmKey, goal);
          setIsRunning(response.success);
          setCurrentGoal(goal);
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <input type="password" placeholder="Enter swarm key" value={swarmKey} onChange={(e) => setSwarmKey(e.target.value)} style={{ marginBottom: '20px', width: '300px', backgroundColor: 'grey', color: 'white' }} />
            <textarea placeholder="Enter goal" value={goal} onChange={(e) => setGoal(e.target.value)} style={{ marginBottom: '20px', width: '300px', height: '100px', backgroundColor: 'grey', color: 'white' }} />
            <button disabled={!swarmKey || !goal} onClick={spawn}>Spawn</button>
        </div>
    );
};

export default Spawn;
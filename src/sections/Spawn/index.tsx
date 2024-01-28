// src/components/Spawn/index.tsx
import { GlobalContext } from '../../GlobalContext';
import { postToRouter } from '../../api';
import React, { useContext } from 'react';

const Spawn = () => {
    const context = useContext(GlobalContext);
    const { swarmKey, setSwarmKey, setIsRunning, currentGoal, setCurrentGoal } = context;

    const spawn = async () => {
        try {
          const response = await postToRouter({ swarm_key: swarmKey, current_goal: currentGoal, type: 'spawn_swarm' });
          if (response.success) {
            setIsRunning(true); // Only set to true if the response was successful
            // ... any other state updates based on success
          } else {
            // Handle the case where response.success is false
            setIsRunning(false);
          }
          setIsRunning(response.success);
          setCurrentGoal(currentGoal);
        } catch (error) {
          console.error(error);
          setIsRunning(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <input type="password" placeholder="Enter swarm key" value={swarmKey} onChange={(e) => setSwarmKey(e.target.value)} style={{ marginBottom: '20px', width: '300px', padding: '10px', backgroundColor: 'transparent', color: 'white', border: '1px solid white', borderRadius: '30px' }} />
            <textarea placeholder="Enter goal" value={currentGoal} onChange={(e) => setCurrentGoal(e.target.value)} style={{ marginBottom: '20px', width: '350px', maxWidth: '95%', height: '100px', padding: '20px', backgroundColor: 'transparent', color: 'white', border: '1px solid white', borderRadius: '20px', resize: 'both' }} />
            <button disabled={!swarmKey || !currentGoal} onClick={() => {spawn(); }}>Spawn</button>
        </div>
    );
};

export default Spawn;
// src/components/Spawn/index.tsx
import { GlobalContext } from '../../GlobalContext';
import React, { useContext } from 'react';

const Spawn = () => {
    const context = useContext(GlobalContext);
    const { swarmKey, setSwarmKey, setIsRunning, currentGoal, setCurrentGoal } = context;

    const spawn = async () => {
        // TODO: Fix postToRouter implementation
        // For now, setIsRunning is set to true to simulate a successful response
        setIsRunning(true);
        setCurrentGoal(currentGoal);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', flex: 1 }}>
            <input type="password" placeholder="Enter swarm key" value={swarmKey} onChange={(e) => setSwarmKey(e.target.value)} style={{ marginBottom: '20px', width: '300px', padding: '10px', backgroundColor: 'transparent', color: 'white', boxShadow: 'inset 0px 0px 20px 0px rgba(0,0,0,0.85)', borderRadius: '30px', border: 'none' }} />
            <textarea placeholder="Enter goal" value={currentGoal} onChange={(e) => setCurrentGoal(e.target.value)} style={{ minWidth: '300px', width: '350px', maxWidth: '95%', minHeight: '20px', height: '150px', padding: '20px', backgroundColor: 'transparent', color: 'white', boxShadow: 'inset 0px 0px 20px 0px rgba(0,0,0,0.85)', borderRadius: '30px', resize: 'both', border: 'none' }} />
            <button disabled={!swarmKey || !currentGoal} onClick={() => { spawn(); }} style={{ marginTop: '15px', borderRadius: '30px', background: 'transparent', color: 'white' }}>Spawn</button>
        </div>
    );
};

export default Spawn;
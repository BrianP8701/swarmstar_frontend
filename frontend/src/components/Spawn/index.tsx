// src/components/Spawn/index.tsx
import { GlobalContext } from 'GlobalContext';
import React, { useContext } from 'react';
import { sendDataToBackend } from '@api/backend_router';

const Spawn = () => {
    const context = useContext(GlobalContext);
    const { swarmKey, setSwarmKey, setIsRunning, currentGoal, setCurrentGoal, backendUrl } = context;

    const handleSendData = async () => {
        const data = {
            type: 'spawn_swarm_instance',
            swarm_key: swarmKey,
            goal: currentGoal
        };

        try {
            const responseData = await sendDataToBackend(data, backendUrl);
            console.log('Response from backend:', responseData);
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };

    const spawn = async () => {

        setIsRunning(true);
        setCurrentGoal(currentGoal);
        handleSendData();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', flex: 1 }}>
            <input type="password" placeholder="Enter swarm key" value={swarmKey} onChange={(e) => setSwarmKey(e.target.value)} style={{ marginBottom: '20px', width: '300px', padding: '10px', backgroundColor: 'transparent', color: 'white', boxShadow: 'inset 0px 0px 20px 0px rgba(0,0,0,0.85)', borderRadius: '30px', border: 'none', outline: 'none' }} />
            <textarea placeholder="Enter goal" value={currentGoal} onChange={(e) => setCurrentGoal(e.target.value)} style={{ minWidth: '300px', width: '350px', maxWidth: '95%', minHeight: '20px', height: '150px', padding: '20px', backgroundColor: 'transparent', color: 'white', boxShadow: 'inset 0px 0px 20px 0px rgba(0,0,0,0.85)', borderRadius: '30px', resize: 'both', border: 'none', outline: 'none' }} />
            <button disabled={!swarmKey || !currentGoal} onClick={() => { spawn(); }} style={{ marginTop: '15px', borderRadius: '30px', background: 'transparent', color: 'white' }}>Spawn</button>
        </div>
    );
};

export default Spawn;
// src/components/Spawn/index.tsx
import { GlobalContext } from '@configs/GlobalContext';
import { useContext } from 'react';
import { sendDataToBackend } from '@api/backend_router';

const Spawn = () => {
    const context = useContext(GlobalContext);
    const { user, setUser } = context;

    const currentSwarm = user.currentSwarm;
    const isRunning = user.isRunning;
    const currentGoal = user.currentGoal;


    const handleSendData = async () => {
        const data = {
            type: 'spawn_swarm_instance',
            swarm_key: currentSwarm,
            goal: currentGoal
        };

        try {
            const responseData = await sendDataToBackend(data);
            console.log('Response from backend:', responseData);
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };

    const spawn = async () => {
        setUser((prev) => {
            return { ...prev, isRunning: true, currentGoal: currentGoal };
        });
        handleSendData();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', flex: 1 }}>
            <input type="password" placeholder="Enter swarm key" value={currentSwarm || ''} onChange={(e) => setUser(prev => ({ ...prev, currentSwarm: e.target.value }))} style={{ marginBottom: '20px', width: '300px', padding: '10px', backgroundColor: 'transparent', color: 'white', boxShadow: 'inset 0px 0px 20px 0px rgba(0,0,0,0.85)', borderRadius: '30px', border: 'none', outline: 'none' }} />
            <textarea placeholder="Enter goal" value={currentGoal} onChange={(e) => setUser(prev => ({ ...prev, currentGoal: e.target.value }))} style={{ minWidth: '300px', width: '350px', maxWidth: '95%', minHeight: '20px', height: '150px', padding: '20px', backgroundColor: 'transparent', color: 'white', boxShadow: 'inset 0px 0px 20px 0px rgba(0,0,0,0.85)', borderRadius: '30px', resize: 'both', border: 'none', outline: 'none' }} />
            <button disabled={!currentSwarm || !currentGoal} onClick={() => { spawn(); }} style={{ marginTop: '15px', borderRadius: '30px', background: 'transparent', color: 'white' }}>Spawn</button>
        </div>
    );
};

export default Spawn;
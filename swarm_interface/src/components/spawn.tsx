// src/pages/spawn.tsx
import { GlobalContext } from '@/configs/GlobalContext';
import { useContext } from 'react';

const Spawn = () => {
    console.log('Spawn page');
    const context = useContext(GlobalContext);
    const { user, setUser } = context;
    const currentSwarm = user.currentSwarm;
    const currentGoal = user.currentGoal;

    const spawn = async () => {
        setUser((prev) => {
            return { ...prev, isRunning: true, currentGoal: currentGoal };
        });

        const data = {
            type: 'spawn_swarm_instance',
            swarm_key: currentSwarm,
            goal: currentGoal
        };

        try {
            // Make a POST request to the /api/postToAzure endpoint
            const response = await fetch('/api/postToAzure', {
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log('Response from Azure:', responseData);
        } catch (error) {
            console.error('Error sending data to Azure through API:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <input
                type="password"
                placeholder="Enter swarm key"
                value={user.currentSwarm || ''}
                onChange={(e) => setUser(prev => ({ ...prev, currentSwarm: e.target.value }))}
                className="text-1 mb-5 w-380 p-2.5"
                style={{ width: '250px' }} // Adjusted width with 'px'
            />
            <textarea
                placeholder="Enter goal"
                value={user.currentGoal}
                onChange={(e) => setUser(prev => ({ ...prev, currentGoal: e.target.value }))}
                className="text-1 min-w-72 w-88 max-w-50% max-h-50% min-h-5 h-37.5 p-5"
                style={{ resize: 'both', overflow: 'auto', maxWidth: '90%', maxHeight: '80%', minHeight: '150px', minWidth: '300px' }} // Adjusted maxWidth and maxHeight
            />
            <button
                disabled={!user.currentSwarm || !user.currentGoal}
                onClick={() => { spawn(); }}
                className="button-text mt-3.5"
            >
                Spawn
            </button>
        </div>
    );
}
export default Spawn;
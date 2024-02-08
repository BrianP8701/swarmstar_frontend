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
        <div className="flex flex-col justify-center items-center h-full flex-1">
            <input
                type="password"
                placeholder="Enter swarm key"
                value={currentSwarm || ''}
                onChange={(e) => setUser(prev => ({ ...prev, currentSwarm: e.target.value }))}
                className="mb-5 w-7 p-2.5 bg-transparent text-white shadow-my-inset rounded-full border-none outline-none"
            />
            <textarea
                placeholder="Enter goal"
                value={currentGoal}
                onChange={(e) => setUser(prev => ({ ...prev, currentGoal: e.target.value }))}
                className="min-w-72 w-88 max-w-95% min-h-5 h-37.5 p-5 bg-transparent text-white shadow-my-inset rounded-full resize border-none outline-none"
            />
            <button
                disabled={!currentSwarm || !currentGoal}
                onClick={() => { spawn(); }}
                className="mt-3.5 rounded-full bg-transparent text-white"
            >
                Spawn
            </button>
        </div>
    );
}
export default Spawn;
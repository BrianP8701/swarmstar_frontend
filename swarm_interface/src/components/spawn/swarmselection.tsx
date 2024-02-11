import React, { useState } from 'react';
import useCreateSwarm from '@/hooks/spawn/createSwarm';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const SwarmSelection = ({selectedSwarm, setSelectedSwarm}: {selectedSwarm: string, setSelectedSwarm: (swarm: string) => void}) => {
    const user_swarms = useSelector((state: RootStateType) => state.user.user_swarms);
    const swarm_names = useSelector((state: RootStateType) => state.user.swarm_names);
    const swarmNames = user_swarms.map(swarm => swarm_names[swarm]);

    const [newSwarm, setNewSwarm] = useState<string>('');
    const [showNewSwarmInput, setShowNewSwarmInput] = useState<boolean>(false);
    const { handleCreateSwarm } = useCreateSwarm();

    const createSwarm = (newSwarm: string) => {
        if (newSwarm != '') {
            handleCreateSwarm(newSwarm);
            setShowNewSwarmInput(false);
            setNewSwarm('');
        }
    };
    return (
        <div className="w-1/5 h-2/5 border border-white overflow-auto text-white round_corners">
            <div className="text-lg font-bold border-b border-gray-700 flex items-center h-12 relative">
                <button onClick={() => setShowNewSwarmInput(!showNewSwarmInput)} style={{ position: 'absolute', right: '12px' }}>
                    <img src="add.png" alt="Add New Swarm" style={{ width: '20px', height: '20px' }} />
                </button>
                <div style={{ width: '100%', textAlign: 'center' }}>Swarms</div>
            </div>
            {showNewSwarmInput && (
                <div className="flex flex-row items-center w-full">
                    <input
                        type="text"
                        className="w-full mx-2 normalize-text"
                        placeholder="Enter new swarm name..."
                        value={newSwarm}
                        onChange={(e) => setNewSwarm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && createSwarm(newSwarm)}
                    />
                </div>
            )}
            <div className="flex flex-col">
                {swarmNames.map((swarm, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedSwarm(swarm)}
                        className={`p-2 border-b border-gray-700 ${selectedSwarm === swarm ? 'bg-gray-700' : ''}`}
                    >
                        {swarm}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SwarmSelection;
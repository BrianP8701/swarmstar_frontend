import React, { useState } from 'react';
import useCreateSwarm from '@/hooks/swarm/createSwarm';
import useSetCurrentSwarm from '@/hooks/swarm/setCurrentSwarm';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const SwarmSelection = () => {
    const swarm_ids = useSelector((state: RootStateType) => state.user.swarm_ids);
    const current_swarm_id = useSelector((state: RootStateType) => state.user.current_swarm_id);
    const swarms = Object.entries(swarm_ids);
    const [newSwarm, setNewSwarm] = useState<string>('');
    const [showNewSwarmInput, setShowNewSwarmInput] = useState<boolean>(false);
    const { handleCreateSwarm } = useCreateSwarm();
    const { handleSetCurrentSwarm } = useSetCurrentSwarm();

    console.log('swarm_ids:', swarm_ids);

    const createSwarm = (newSwarm: string) => {
        if (newSwarm != '') {
            handleCreateSwarm(newSwarm);
            setShowNewSwarmInput(false);
            setNewSwarm('');
        }
    };

    return (
        <div
            className="border border-white overflow-hidden text-white round_corners"
            style={{
                width: 'calc(100% - 120px)', // Make the width 30px less than its parent
                height: '500px', // Set height to 500px
                margin: 'auto', // Center the component horizontally in its parent
                display: 'flex', // Use flexbox
                flexDirection: 'column', // Make the flex direction column
            }}
        >
            {/* Header Section */}
            <div className="text-lg font-bold bg-gray-900 flex justify-between items-center h-12 relative" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>Swarms</div>
                <button onClick={() => { setShowNewSwarmInput(!showNewSwarmInput); handleSetCurrentSwarm(''); }} style={{ position: 'absolute', right: '15px' }}>
                    <img src="add.png" alt="Add New Swarm" style={{ width: '20px', height: '20px' }} />
                </button>
            </div>

            {/* Create new swarm  */}
            <div className="overflow-auto" style={{ flexGrow: 1 }}>
                {showNewSwarmInput && (
                    <div className="flex flex-row items-center w-full p-2 border-y border-gray-600">
                        <input
                            type="text"
                            className="w-full normalize-text"
                            placeholder="Enter new swarm name..."
                            value={newSwarm}
                            onChange={(e) => { setNewSwarm(e.target.value); }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    createSwarm(newSwarm);
                                } else if (e.key === 'Escape') {
                                    setShowNewSwarmInput(false);
                                }
                            }}
                        />
                    </div>
                )}
                {/* Swarms List Section */}
                <div className="flex flex-col">
                    {swarms.map(([swarm_id, swarm_name]) => (
                        <button
                            key={swarm_id}
                            onClick={() => { handleSetCurrentSwarm(swarm_id); }}
                            className={`p-2 border-b border-gray-600 w-full text-left ${current_swarm_id === swarm_id ? 'bg-gray-700' : ''}`}
                        >
                            {swarm_name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );


}

export default SwarmSelection;
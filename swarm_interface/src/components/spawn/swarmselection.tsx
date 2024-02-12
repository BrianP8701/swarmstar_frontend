import React, { useState } from 'react';
import useCreateSwarm from '@/hooks/spawn/createSwarm';
import useGetSwarm from '@/hooks/spawn/getSwarm';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { setCurrentSwarm } from '@/redux/userSlice';
import { setSwarm } from '@/redux/swarmSlice';

const SwarmSelection = ({ }: { selectedSwarm: string, setSelectedSwarm: (swarm: string) => void }) => {
    const dispatch = useDispatch();
    const swarm_ids = useSelector((state: RootStateType) => state.user.swarm_ids);
    const swarm_names = useSelector((state: RootStateType) => state.user.swarm_names);
    const current_swarm = useSelector((state: RootStateType) => state.user.current_swarm);
    const swarms = swarm_ids.map(swarm => [swarm, swarm_names[swarm]]);
    const [newSwarm, setNewSwarm] = useState<string>('');
    const [showNewSwarmInput, setShowNewSwarmInput] = useState<boolean>(false);
    const { handleCreateSwarm } = useCreateSwarm();
    const { handleGetSwarm } = useGetSwarm();


    const chooseSwarm = async (swarm_id: string) => {
        dispatch(setCurrentSwarm(swarm_id));
        const swarm_data = await handleGetSwarm(swarm_id);
    }

    const createSwarm = (newSwarm: string) => {
        if (newSwarm != '') {
            handleCreateSwarm(newSwarm);
            setShowNewSwarmInput(false);
        }
    };

    return (
        <div
            className="border border-white overflow-hidden text-white round_corners"
            style={{
                width: 'calc(100% - 30px)', // Make the width 30px less than its parent
                height: '500px', // Set height to 500px
                margin: 'auto', // Center the component horizontally in its parent
                display: 'flex', // Use flexbox
                flexDirection: 'column', // Make the flex direction column
            }}
        >
            {/* Header Section */}
            <div className="text-lg font-bold bg-gray-900 flex justify-between items-center h-12 relative" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>Swarms</div>
                <button onClick={() => { setShowNewSwarmInput(!showNewSwarmInput); dispatch(setCurrentSwarm('')); }} style={{ position: 'absolute', right: '15px' }}>
                    <img src="add.png" alt="Add New Swarm" style={{ width: '20px', height: '20px' }} />
                </button>
            </div>

            {/* Swarms List Section */}
            <div className="overflow-auto" style={{ flexGrow: 1 }}>
                {showNewSwarmInput && (
                    <div className="flex flex-row items-center w-full p-2 border-y border-gray-600">
                        <input
                            type="text"
                            className="w-full normalize-text"
                            placeholder="Enter new swarm name..."
                            value={newSwarm}
                            onChange={(e) => { setNewSwarm(e.target.value); dispatch(setCurrentSwarm('')); }}
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
                <div className="flex flex-col">
                    {swarms.map(([swarm_id, swarm_name], index) => (
                        <button
                            key={index}
                            onClick={() => { chooseSwarm(swarm_id); }}
                            className={`p-2 border-b border-gray-600 w-full text-left ${current_swarm === swarm_id ? 'bg-gray-700' : ''}`}
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
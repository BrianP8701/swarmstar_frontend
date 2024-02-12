import React, { useState } from 'react';
import useCreateSwarm from '@/hooks/spawn/createSwarm';
import useSetSwarm from '@/hooks/spawn/setSwarm';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { setCurrentSwarm } from '@/redux/userSlice';

const SwarmSelection = ({ selectedSwarm, setSelectedSwarm }: { selectedSwarm: string, setSelectedSwarm: (swarm: string) => void }) => {
    const dispatch = useDispatch();
    const swarm_ids = useSelector((state: RootStateType) => state.user.swarm_ids);
    const swarm_names = useSelector((state: RootStateType) => state.user.swarm_names);
    const swarms = swarm_ids.map(swarm => [swarm, swarm_names[swarm]]);
    const [newSwarm, setNewSwarm] = useState<string>('');
    const [showNewSwarmInput, setShowNewSwarmInput] = useState<boolean>(false);
    const { handleCreateSwarm } = useCreateSwarm();
    const { handleSetSwarm } = useSetSwarm();


    const chooseSwarm = (swarm_id: string) => {
        setSelectedSwarm(swarm_id);
        dispatch(setCurrentSwarm(swarm_id));
        handleSetSwarm(swarm_id);
    }

    const createSwarm = (newSwarm: string) => {
        if (newSwarm != '') {
            handleCreateSwarm(newSwarm);
            setShowNewSwarmInput(false);
            chooseSwarm('');
        }
    };

    return (
        <div
            className="border border-white overflow-auto text-white round_corners"
            style={{
                width: 'calc(100% - 30px)', // Make the width 20px less than its parent
                height: '500px', // Set height to 500px
                margin: 'auto', // Center the component horizontally in its parent
                top: '50%', // Move the top edge to the middle of the parent
                left: '50%', // Move the left edge to the middle of the parent
                display: 'flex', // Use flexbox
                flexDirection: 'column', // Make the flex direction column
                justifyContent: 'center', // Align items to the top
                alignItems: 'center', // Center items horizontally
            }}
        >
            <div className="text-lg font-bold border-b border-gray-700 flex items-center h-12 relative">
                <button onClick={() => { setShowNewSwarmInput(!showNewSwarmInput); setSelectedSwarm(''); }} style={{ position: 'absolute', right: '12px' }}>
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
                        onChange={(e) => { setNewSwarm(e.target.value); setSelectedSwarm(''); }}
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
                        className={`p-2 border-b border-gray-700 ${selectedSwarm === swarm_id ? 'bg-gray-700' : ''}`}
                    >
                        {swarm_name}
                    </button>
                ))}
            </div>
        </div>
    );

}

export default SwarmSelection;
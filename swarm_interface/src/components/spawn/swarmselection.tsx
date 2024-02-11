import React, { useState } from 'react';
import useCreateSwarm from '@/hooks/spawn/createSwarm';
import useSetSwarm from '@/hooks/spawn/setSwarm';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { setCurrentSwarm } from '@/redux/userSlice';
import { setSwarm } from '@/redux/swarmSlice';

const SwarmSelection = ({ selectedSwarm, setSelectedSwarm }: { selectedSwarm: string, setSelectedSwarm: (swarm: string) => void }) => {
    const dispatch = useDispatch();
    const swarm_ids = useSelector((state: RootStateType) => state.user.swarm_ids);
    const swarm_names = useSelector((state: RootStateType) => state.user.swarm_names);
    const swarms = swarm_ids.map(swarm => [swarm, swarm_names[swarm]]);
    const [newSwarm, setNewSwarm] = useState<string>('');
    const [showNewSwarmInput, setShowNewSwarmInput] = useState<boolean>(false);
    const { handleCreateSwarm } = useCreateSwarm();
    const { handleSetSwarm } = useSetSwarm();


    const chooseSwarm = (swarm_id : string) => {
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
        <div className="w-1/5 h-2/5 border border-white overflow-auto text-white round_corners">
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
                        onChange={(e) => {setNewSwarm(e.target.value); setSelectedSwarm('');}}
                        onKeyDown={(e) => e.key === 'Enter' && createSwarm(newSwarm)}
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
    )
}

export default SwarmSelection;
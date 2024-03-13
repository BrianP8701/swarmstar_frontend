import React, { useState, useRef } from 'react';
import useCreateSwarm from '@/hooks/swarm/createSwarm';
import useSetCurrentSwarm from '@/hooks/swarm/setCurrentSwarm';
import useCopySwarm from '@/hooks/swarm/copySwarm';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import Image from 'next/image';

const SwarmSelection = () => {
    const swarm_ids = useSelector((state: RootStateType) => state.user.swarm_ids);
    const current_swarm_id = useSelector((state: RootStateType) => state.user.current_swarm_id);
    const swarms = Object.entries(swarm_ids);
    const [newSwarm, setNewSwarm] = useState<string>('');
    const [showNewSwarmInput, setShowNewSwarmInput] = useState<boolean>(false);
    const [showCopySwarmInput, setShowCopySwarmInput] = useState<boolean>(false);
    const { handleCreateSwarm } = useCreateSwarm();
    const { handleSetCurrentSwarm } = useSetCurrentSwarm();
    const { handleCopySwarm } = useCopySwarm();
    const inputRef = useRef<HTMLInputElement>(null);

    const createSwarm = (newSwarm: string) => {
        if (newSwarm !== '') {
            handleCreateSwarm(newSwarm);
            setShowNewSwarmInput(false);
            setNewSwarm('');
        }
    };

    const copySwarm = (newSwarm: string) => {
        if (newSwarm !== '') {
            handleCopySwarm(newSwarm, current_swarm_id);
            setShowCopySwarmInput(false);
            setNewSwarm('');
        }
    };

    const handleCopyClick = () => {
        setShowCopySwarmInput(!showCopySwarmInput);
        if (showCopySwarmInput) {
            setShowNewSwarmInput(false);
        }
        setNewSwarm(swarms.find(([id]) => id === current_swarm_id)?.[1] + ' copy' || '');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleCreateClick = () => {
        setShowNewSwarmInput(!showNewSwarmInput);
        if (showNewSwarmInput) {
            setShowCopySwarmInput(false);
        }
        handleSetCurrentSwarm('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div
            className="shadow-outside overflow-hidden text-white round_corners"
            style={{
                width: 'calc(100% - 120px)',
                height: '500px',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header Section */}
            <div className="text-lg font-bold bg-gray-900 flex justify-between items-center h-12 relative" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>swarmstar</div>
                <button
                    onClick={handleCopyClick}
                    style={{ position: 'absolute', left: '15px' }}
                    disabled={!current_swarm_id}
                >
                    <Image src="/copy.png" alt="Copy Swarm" width={20} height={20} />
                </button>
                <button onClick={handleCreateClick} style={{ position: 'absolute', right: '15px' }}>
                    <Image src="/add.png" alt="Add New Swarm" width={20} height={20} />
                </button>
            </div>

            {/* Create new swarm / Copy swarm */}
            <div className="overflow-auto" style={{ flexGrow: 1 }}>
                {showNewSwarmInput && (
                    <div className="flex flex-row items-center w-full p-2 border-y border-gray-600 bg-gray-600">
                        <input
                            ref={inputRef}
                            type="text"
                            className="w-full normalize-text bg-gray-600"
                            placeholder="Enter new swarm name..."
                            value={newSwarm}
                            onChange={(e) => { setNewSwarm(e.target.value); }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    createSwarm(newSwarm);
                                } else if (e.key === 'Escape') {
                                    setNewSwarm('')
                                    setShowNewSwarmInput(false);
                                }
                            }}
                        />
                    </div>
                )}
                {showCopySwarmInput && (
                    <div className="flex flex-row items-center w-full p-2 border-y border-gray-600 bg-gray-600">
                        <input
                            ref={inputRef}
                            type="text"
                            className="w-full normalize-text bg-gray-600"
                            placeholder="Enter new swarm name..."
                            value={newSwarm}
                            onChange={(e) => { setNewSwarm(e.target.value); }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    copySwarm(newSwarm);
                                } else if (e.key === 'Escape') {
                                    setNewSwarm('')
                                    setShowCopySwarmInput(false);
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
};

export default SwarmSelection;
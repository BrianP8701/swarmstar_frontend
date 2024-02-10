// src/pages/spawn.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { setCurrentSwarm, setCurrentGoal, setIsRunning } from '@/redux/userSlice';

const Spawn = () => {
    const dispatch = useDispatch();
    const current_goal = useSelector((state: RootStateType) => state.user.current_goal);
    const user_swarms = useSelector((state: RootStateType) => state.user.user_swarms);
    const [newSwarm, setNewSwarm] = useState('');
    const [selectedSwarm, setSelectedSwarm] = useState('');

    const createSwarm = () => {
        if (newSwarm) {
            // Dispatch an action to create a new swarm or set it directly (based on your app logic)
            dispatch(setCurrentSwarm(newSwarm));
            setNewSwarm('');
        }
    };

    const handleDeleteSwarm = async (swarmId: string) => {
        // Confirmation dialog
        if (window.confirm('Are you sure you want to delete this swarm? This action is irreversible.')) {
            // Dispatch an action to delete the swarm (not shown here, implement according to your app logic)
            console.log('Deleting swarm:', swarmId);
            // Optionally, update UI or state as needed after deletion
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <div className="w-300 h-400 border overflow-auto">
                <div className="text-center border-b p-1">My Swarms</div>
                <input
                    type="text"
                    placeholder="Create a new swarm"
                    value={newSwarm}
                    onChange={(e) => setNewSwarm(e.target.value)}
                    className="w-full p-2.5"
                    onBlur={createSwarm} // Consider creating the swarm on blur or add a button to confirm creation
                />
                <div className="flex flex-col">
                    {user_swarms.map((swarm, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedSwarm(swarm)}
                            className={`p-2 ${selectedSwarm === swarm ? 'bg-gray-300' : ''}`}
                        >
                            {swarm}
                        </button>
                    ))}
                </div>
            </div>
            {selectedSwarm && (
                <div>
                    <button
                        onClick={() => console.log('Resuming swarm:', selectedSwarm)}
                        className="button-text mt-3.5"
                    >
                        Resume
                    </button>
                    <button
                        onClick={() => handleDeleteSwarm(selectedSwarm)}
                        className="button-text mt-3.5"
                    >
                        Delete
                    </button>
                </div>
            )}
            {!selectedSwarm && newSwarm && (
                <>
                    <textarea
                        placeholder="Enter goal"
                        value={current_goal || ''}
                        onChange={(e) => dispatch(setCurrentGoal(e.target.value))}
                        className="text-1 min-w-72 w-88 max-w-50% max-h-50% min-h-5 h-37.5 p-5"
                        style={{ resize: 'both', overflow: 'auto', maxWidth: '90%', maxHeight: '80%', minHeight: '150px', minWidth: '300px' }}
                    />
                    <button
                        onClick={() => console.log('Spawning new swarm:', newSwarm)}
                        className="button-text mt-3.5"
                        disabled={!current_goal}
                    >
                        Spawn
                    </button>
                </>
            )}
        </div>
    );
};

export default Spawn;
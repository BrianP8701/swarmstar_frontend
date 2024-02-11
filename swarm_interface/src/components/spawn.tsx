// src/pages/spawn.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { setCurrentSwarm, setCurrentGoal, setIsRunning } from '@/redux/userSlice';

const Spawn = () => {
    const dispatch = useDispatch();
    //
    const current_goal = useSelector((state: RootStateType) => state.user.current_goal);

    const [newSwarm, setNewSwarm] = useState('');
    const [selectedSwarm, setSelectedSwarm] = useState('');
    const swarmNames = user_swarms.map(swarm => swarm_names[swarm]);
    const [showNewSwarmInput, setShowNewSwarmInput] = useState(false);



    const handleDeleteSwarm = async (swarmId: string) => {
        // Confirmation dialog
        if (window.confirm('Are you sure you want to delete this swarm? This action is irreversible.')) {
            // Dispatch an action to delete the swarm (not shown here, implement according to your app logic)
            console.log('Deleting swarm:', swarmId);
            // Optionally, update UI or state as needed after deletion
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', overflow: 'none' }}>


        </div>
    );
};

export default Spawn;
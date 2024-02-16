import useDeleteSwarm from '@hooks/spawn/deleteSwarm';
import useSpawnSwarm from '@/hooks/spawn/spawnSwarm';
import { RootStateType } from '@models/rootstate';
import { useSelector, useDispatch } from 'react-redux';
import { setGoal } from '@/redux/swarmSlice';

const SwarmContols = () => {
    const dispatch = useDispatch();

    const { handleDeleteSwarm } = useDeleteSwarm();
    const { handleSpawnSwarm } = useSpawnSwarm();

    const current_swarm_id = useSelector((state: RootStateType) => state.user.current_swarm_id);
    const isSpawned = useSelector((state: RootStateType) => state.swarm.spawned);
    const isActive = useSelector((state: RootStateType) => state.swarm.active);
    const goal = useSelector((state: RootStateType) => state.swarm.goal);

    const deleteSwarm = (swarmId: string) => {
        if (window.confirm('Are you sure you want to delete this swarm? This action is irreversible.')) {
            handleDeleteSwarm(swarmId);
        }
    }
    const spawnSwarm = () => {
        if (current_swarm_id) {
            handleSpawnSwarm(goal, current_swarm_id);
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 20px)', // Subtract padding from total height
            width: 'calc(100% - 20px)', // Subtract padding from total width
            padding: '10px', // Add padding as specified
        }}>
            {current_swarm_id && isSpawned && !isActive && (
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <textarea
                            placeholder="Enter goal"
                            value={goal}
                            readOnly
                            className="text-1 p-5"
                            style={{
                                resize: 'both',
                                overflow: 'auto',
                                display: 'block',
                                margin: '0 auto',
                                minWidth: '450px',
                                minHeight: '240px',
                                width: 'auto', // Allows width to adjust automatically
                                height: '35%', // Initial height as 35% of parent
                                maxWidth: '100%', // Allows growing up to the parent width
                                maxHeight: '100%', // Allows growing up to the parent height
                            }}
                        />
                        <button
                            onClick={() => deleteSwarm(current_swarm_id)}
                            className="button-text mt-3.5"
                            style={{ display: 'block', margin: '10px auto' }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
            {current_swarm_id && isSpawned && isActive && (
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <textarea
                            placeholder="Enter goal"
                            value={goal}
                            readOnly
                            className="text-1 p-5"
                            style={{
                                resize: 'both',
                                overflow: 'auto',
                                display: 'block',
                                margin: '0 auto',
                                minWidth: '450px',
                                minHeight: '240px',
                                width: 'auto', // Allows width to adjust automatically
                                height: '35%', // Initial height as 35% of parent
                                maxWidth: '100%', // Allows growing up to the parent width
                                maxHeight: '100%', // Allows growing up to the parent height
                            }}
                        />
                        <button
                            onClick={() => deleteSwarm(current_swarm_id)}
                            className="button-text mt-3.5"
                            style={{ display: 'block', margin: '10px auto' }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
            {current_swarm_id && !isSpawned && (
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <textarea
                        placeholder="Enter goal"
                        value={goal || ''}
                        onChange={(e) => dispatch(setGoal(e.target.value))}
                        className="text-1 p-5"
                        style={{
                            resize: 'both',
                            overflow: 'auto',
                            display: 'block',
                            margin: '0 auto',
                            minWidth: '450px',
                            minHeight: '240px',
                            width: 'auto', // Allows width to adjust automatically
                            height: '35%', // Initial height as 35% of parent
                            maxWidth: '100%', // Allows growing up to the parent width
                            maxHeight: '100%', // Allows growing up to the parent height
                        }}
                    />
                    <button
                        className="button-text mt-3.5"
                        onClick={() => spawnSwarm()}
                        disabled={!goal}
                        style={{ display: 'block', margin: '10px auto' }}
                    >
                        Spawn
                    </button>
                    <button
                        onClick={() => deleteSwarm(current_swarm_id)}
                        className="button-text mt-3.5"
                        style={{ display: 'block', margin: '10px auto' }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default SwarmContols;
import useDeleteSwarm from '@hooks/spawn/deleteSwarm';
import useSpawnSwarm from '@/hooks/spawn/spawnSwarm';
import { RootStateType } from '@models/rootstate';
import { useSelector, useDispatch } from 'react-redux';
import { setSwarmGoal } from '@/redux/swarmSlice';
import { setCurrentSwarm } from '@/redux/userSlice';

const SwarmContols = ({ }: { selectedSwarm: string, setSelectedSwarm: (swarm: string) => void }) => {
    const dispatch = useDispatch();
    const { handleDeleteSwarm } = useDeleteSwarm();
    const { handleSpawnSwarm } = useSpawnSwarm();
    const goal = useSelector((state: RootStateType) => state.swarm.goal);
    const state = useSelector((state: RootStateType) => state);
    console.log(state);
    const isSpawned = useSelector((state: RootStateType) => state.swarm.spawned);
    console.log('isSpawned:', isSpawned);
    const current_swarm = useSelector((state: RootStateType) => state.user.current_swarm);

    const deleteSwarm = (swarmId: string) => {
        if (window.confirm('Are you sure you want to delete this swarm? This action is irreversible.')) {
            handleDeleteSwarm(swarmId);
            dispatch(setCurrentSwarm(''));
        }
    }

    const spawnSwarm = (goal: string) => {
        if (current_swarm) {
            handleSpawnSwarm(goal, current_swarm);
        }
    }

    const resumeSwarm = () => {

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
            <div style={{ textAlign: 'center', width: '100%' }}>
                {current_swarm && isSpawned && (
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
                                minWidth: '250px',
                                minHeight: '140px',
                                width: 'auto', // Allows width to adjust automatically
                                height: '35%', // Initial height as 35% of parent
                                maxWidth: '100%', // Allows growing up to the parent width
                                maxHeight: '100%', // Allows growing up to the parent height
                            }}
                        />
                        <button
                            className="button-text mt-3.5"
                            onClick={() => resumeSwarm()}
                            disabled={!goal}
                            style={{ display: 'block', margin: '10px auto' }}
                        >
                            Resume
                        </button>
                        <button
                            onClick={() => deleteSwarm(current_swarm)}
                            className="button-text mt-3.5"
                            style={{ display: 'block', margin: '10px auto' }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            {current_swarm && !isSpawned && (
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <textarea
                        placeholder="Enter goal"
                        value={goal || ''}
                        onChange={(e) => dispatch(setSwarmGoal(e.target.value))}
                        className="text-1 p-5"
                        style={{
                            resize: 'both',
                            overflow: 'auto',
                            display: 'block',
                            margin: '0 auto',
                            minWidth: '250px',
                            minHeight: '140px',
                            width: 'auto', // Allows width to adjust automatically
                            height: '35%', // Initial height as 35% of parent
                            maxWidth: '100%', // Allows growing up to the parent width
                            maxHeight: '100%', // Allows growing up to the parent height
                        }}
                    />
                    <button
                        className="button-text mt-3.5"
                        onClick={() => spawnSwarm(goal)}
                        disabled={!goal}
                        style={{ display: 'block', margin: '10px auto' }}
                    >
                        Spawn
                    </button>
                    <button
                        onClick={() => deleteSwarm(current_swarm)}
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
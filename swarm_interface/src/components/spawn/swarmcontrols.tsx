import useDeleteSwarm from '@hooks/spawn/deleteSwarm';
import useStartSwarm from '@hooks/spawn/startSwarm';
import { RootStateType } from '@models/rootstate';
import { useSelector, useDispatch } from 'react-redux';
import { setSwarmGoal } from '@/redux/swarmSlice';

const SwarmContols = ({ selectedSwarm, setSelectedSwarm }: { selectedSwarm: string, setSelectedSwarm: (swarm: string) => void }) => {
    const dispatch = useDispatch();
    const { handleDeleteSwarm } = useDeleteSwarm();
    const { handleStartSwarm } = useStartSwarm();
    const goal = useSelector((state: RootStateType) => state.swarm.goal);
    const isSpawned = useSelector((state: RootStateType) => state.swarm.spawned);


    const deleteSwarm = (swarmId: string) => {
        if (window.confirm('Are you sure you want to delete this swarm? This action is irreversible.')) {
            handleDeleteSwarm(swarmId);
            setSelectedSwarm('');
        }
    }

    const startSwarm = (goal: string) => {
        handleStartSwarm(goal, selectedSwarm);
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
                {selectedSwarm && isSpawned && (
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
                            onClick={() => startSwarm(goal)}
                            disabled={!goal}
                            style={{ display: 'block', margin: '10px auto' }}
                        >
                            Resume
                        </button>
                        <button
                            onClick={() => deleteSwarm(selectedSwarm)}
                            className="button-text mt-3.5"
                            style={{ display: 'block', margin: '10px auto' }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            {selectedSwarm && !isSpawned && (
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
                        onClick={() => startSwarm(goal)}
                        disabled={!goal}
                        style={{ display: 'block', margin: '10px auto' }}
                    >
                        Spawn
                    </button>
                    <button
                        onClick={() => deleteSwarm(selectedSwarm)}
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
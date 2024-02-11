import useDeleteSwarm from '@hooks/spawn/deleteSwarm';
import useStartSwarm from '@hooks/spawn/startSwarm';
import { RootStateType } from '@models/rootstate';
import { useSelector, useDispatch } from 'react-redux';
import { setSwarmGoal, setIsSpawned } from '@/redux/swarmSlice';

const SwarmContols = ({ selectedSwarm, setSelectedSwarm }: { selectedSwarm: string, setSelectedSwarm: (swarm: string) => void }) => {
    const dispatch = useDispatch();
    const { handleDeleteSwarm } = useDeleteSwarm();
    const { handleStartSwarm } = useStartSwarm();
    const goal = useSelector((state: RootStateType) => state.swarm.goal);
    const isSpawned = useSelector((state: RootStateType) => state.swarm.spawned);


    const deleteSwarm = (swarmId: string) => {
        // Confirmation dialog
        if (window.confirm('Are you sure you want to delete this swarm? This action is irreversible.')) {
            handleDeleteSwarm(swarmId);
            setSelectedSwarm('');
        }
    }

    const startSwarm = (goal: string) => {
        handleStartSwarm(goal, selectedSwarm);
    }

    return (
        <div>
            {selectedSwarm && isSpawned && (
                <div>
                    <button
                        onClick={() => console.log('Resuming swarm:', selectedSwarm)}
                        className="button-text mt-3.5"
                    >
                        Resume
                    </button>
                    <button
                        onClick={() => deleteSwarm(selectedSwarm)}
                        className="button-text mt-3.5"
                    >
                        Delete
                    </button>
                </div>
            )}
            {selectedSwarm && !isSpawned && (
                <>
                    <textarea
                        placeholder="Enter goal"
                        value={goal || ''}
                        onChange={(e) => dispatch(setSwarmGoal(e.target.value))}
                        className="text-1 min-w-72 w-88 max-w-50% max-h-50% min-h-5 h-37.5 p-5"
                        style={{ resize: 'both', overflow: 'auto', maxWidth: '90%', maxHeight: '80%', minHeight: '150px', minWidth: '300px' }}
                    />
                    <button
                        className="button-text mt-3.5"
                        disabled={!goal}
                    >
                        Spawn
                    </button>
                    <button
                        onClick={() => deleteSwarm(selectedSwarm)}
                        className="button-text mt-3.5"
                    >
                        Delete
                    </button>
                </>
            )}
        </div>
    )
}

export default SwarmContols;
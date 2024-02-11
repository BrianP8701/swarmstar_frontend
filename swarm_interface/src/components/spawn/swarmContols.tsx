import useDeleteSwarm from '@hooks/spawn/useDeleteSwarm';
import useStartSwarm from '@hooks/spawn/startSwarm';
import { RootStateType } from '@models/rootstate';
import { useSelector, useDispatch } from 'react-redux';


const SwarmContols = ({selectedSwarm, setSelectedSwarm}: {selectedSwarm: string, setSelectedSwarm: (swarm: string) => void}) => {

    const { handleDeleteSwarm } = useDeleteSwarm();
    const { handleStartSwarm } = useStartSwarm();
    const swarm_names = useSelector((state: RootStateType) => state.swarm.goal);

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
            {selectedSwarm && (
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
            {!selectedSwarm && (
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
    )
}

export default SwarmContols;
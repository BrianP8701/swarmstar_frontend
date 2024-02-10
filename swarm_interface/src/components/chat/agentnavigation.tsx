import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { setCurrentAgent } from '@/redux/chatSlice';

const AgentNavigation = () => {
    const dispatch = useDispatch();
    const active_agents = useSelector((state: RootStateType) => state.chat.active_agents);
    const dead_agents = useSelector((state: RootStateType) => state.chat.dead_agents);
    const current_agent = useSelector((state: RootStateType) => state.chat.current_agent);
    const all_agents = active_agents.concat(dead_agents);

    const selectAgent = (index: number) => {
        dispatch(setCurrentAgent(all_agents[index]));
        console.log(`Agent ${all_agents[index]} selected`);
    };

    return (
        <div className="h-full w-full bg-gray-700 pl-1 pr-1 pt-2 pb-2 agent-navigation-container ">
            {all_agents.map((agent, index) => (
                <button className="agent-button w-full" key={index} onClick={() => selectAgent(index)}>
                    {agent}
                </button>
            ))}
        </div>
    );
};

export default AgentNavigation;

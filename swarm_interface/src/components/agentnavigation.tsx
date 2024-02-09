import { useContext } from 'react';
import { GlobalContext } from '@configs/GlobalContext';

const AgentNavigation = () => {
    const { agents, setAgents } = useContext(GlobalContext);
    const { all_agents } = agents;
    console.log(agents.all_agents); // Check if agents are correctly populated

    const selectAgent = (index: number) => {
        setAgents({ ...agents, currentAgent: all_agents[index] });
        console.log(`Agent ${all_agents[index]} selected`);
    };

    return (
        <div className="h-full w-full bg-gray-900 pl-1 pr-1 pt-2 pb-2 agent-navigation-container">
            {all_agents.map((agent, index) => (
                <button className="agent-button w-full" key={index} onClick={() => selectAgent(index)}>
                    {agent}
                </button>
            ))}
        </div>
    );
};

export default AgentNavigation;

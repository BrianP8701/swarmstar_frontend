import { useContext } from 'react';
import { GlobalContext } from '@configs/GlobalContext';

const AgentInfo = () => {
    const context = useContext(GlobalContext);
    const { user } = context;
    const isRunning = user.isRunning;

    return (
        <div className="">
            boom
        </div>
    );
};

export default AgentInfo;


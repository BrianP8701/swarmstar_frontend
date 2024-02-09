import { useContext } from 'react';
import { GlobalContext } from '@configs/GlobalContext';

const AgentChat = () => {
    const context = useContext(GlobalContext);
    const { user } = context;


    return (
        <div className="">
            Whatt
        </div>
    );
};

export default AgentChat;


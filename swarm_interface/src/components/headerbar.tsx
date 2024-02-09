import { useContext } from 'react';
import { GlobalContext } from '@configs/GlobalContext';

const HeaderBar = () => {
    const context = useContext(GlobalContext);
    const { user } = context;
    const isRunning = user.isRunning;

    return (
        <div className="h-12 w-full fixed bg-black text-white flex items-center justify-end pr-20">
            <div >{isRunning ? 'Running' : 'Not running'}</div>
        </div>
    );
};

export default HeaderBar;
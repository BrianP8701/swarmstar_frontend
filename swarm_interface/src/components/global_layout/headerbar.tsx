import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const HeaderBar = () => {
    const is_running = useSelector((state: RootStateType) => state.user.is_running);


    return (
        <div className="h-12 w-full fixed bg-black text-white flex items-center justify-end pr-20">
            <div >{is_running ? 'Running' : 'Not running'}</div>
        </div>
    );
};

export default HeaderBar;
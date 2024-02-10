import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { useRouter } from 'next/router';

const Sidebar = () => {
    const router = useRouter(); // Call useRouter here at the top level of your component

    return (
        <div className="w-10 h-screen bg-black fixed z-10 flex flex-col items-center">
            <div className="w-12 h-12 mb-10 bg-transparent" style={{}}></div>
            <button className="sidebar-section-icon" style={{ backgroundImage: 'url(/play.png)' }} onClick={() => { router.push('/spawn'); }}></button>
            <button className="sidebar-section-icon" style={{ backgroundImage: 'url(/chat.png)' }} onClick={() => { router.push('/chat'); }}></button>
            <button className="sidebar-section-icon" style={{ backgroundImage: 'url(/metrics.png)' }} onClick={() => { router.push('/metrics'); }}></button>
            <button className="sidebar-section-icon" style={{ backgroundImage: 'url(/bug.png)' }} onClick={() => { router.push('/debugging'); }}></button>
        </div>
    );
};

export default Sidebar;
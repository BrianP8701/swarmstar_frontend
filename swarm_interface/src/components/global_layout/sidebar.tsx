import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className="w-10 h-screen bg-black fixed z-10 flex flex-col items-center">
            <div className="w-12 h-12 mb-10 bg-transparent" style={{}}></div>
            <Link href="/spawn">
                <a className="sidebar-section-icon" style={{ backgroundImage: 'url(/play.png)' }} aria-label="Spawn"></a>
            </Link>
            <Link href="/chat">
                <a className="sidebar-section-icon" style={{ backgroundImage: 'url(/chat.png)' }} aria-label="Chat"></a>
            </Link>
            <Link href="/metrics">
                <a className="sidebar-section-icon" style={{ backgroundImage: 'url(/metrics.png)' }} aria-label="Metrics"></a>
            </Link>
            <Link href="/debugging">
                <a className="sidebar-section-icon" style={{ backgroundImage: 'url(/bug.png)' }} aria-label="Debugging"></a>
            </Link>
        </div>
    );
};

export default Sidebar;
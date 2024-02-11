// pages/spawn.tsx
import Layout from '@/components/global_layout/layout';
import { useState } from 'react';
import SwarmSelection from '@/components/spawn/swarmselection';
import SwarmControls from '@/components/spawn/swarmcontrols';

const SpawnPage = () => {
    const [selectedSwarm, setSelectedSwarm] = useState<string>('');

    // Add a return statement to render your component
    return (
        <Layout>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', overflow: 'hidden' }}> {/* Note: Changed overflow: 'none' to 'hidden' */}
                <SwarmSelection selectedSwarm={selectedSwarm} setSelectedSwarm={setSelectedSwarm} />
                <SwarmControls selectedSwarm={selectedSwarm} setSelectedSwarm={setSelectedSwarm} />
            </div>
        </Layout>
    );
};

export default SpawnPage;


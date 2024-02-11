// pages/spawn.tsx
import Layout from '@/components/global_layout/layout';
import Spawn from '@components/spawn';
import { useState } from 'react';
import SwarmSelection from '@/components/spawn/swarmselection';
import SwarmControls from '@/components/spawn/swarmControls';

const SpawnPage = () => {
    const [selectedSwarm, setSelectedSwarm] = useState<string>('');

    <Layout>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', overflow: 'none' }}>
            <SwarmSelection selectedSwarm={selectedSwarm} setSelectedSwarm={setSelectedSwarm} />
            <SwarmControls selectedSwarm={selectedSwarm} setSelectedSwarm={setSelectedSwarm} />
        </div>

    </Layout>
};

export default SpawnPage;


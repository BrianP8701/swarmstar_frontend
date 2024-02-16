// pages/spawn.tsx
import Layout from '@/components/global_layout/layout';
import SwarmSelection from '@/components/spawn/swarmselection';
import SwarmControls from '@/components/spawn/swarmcontrols';

const SpawnPage = () => {

    return (
        <Layout>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '30% 70%', // Split into two columns: 20% for the first and 80% for the second
                height: '100%',
                width: '100%',
                overflow: 'hidden'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', // Make sure it takes the full height of its parent
                }}>
                    <SwarmSelection />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', // Ensure it also takes full height
                }}>
                    <SwarmControls />
                </div>
            </div>
        </Layout>
    );

};

export default SpawnPage;


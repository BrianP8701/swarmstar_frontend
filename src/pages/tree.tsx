import Layout from '@/components/global_layout/layout';
import SwarmTree from '@/components/tree/swarmtree';

const TreePage = () => (
    <Layout>
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
            <SwarmTree />
        </div>
    </Layout>
);

export default TreePage;
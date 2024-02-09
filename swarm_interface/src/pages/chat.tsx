// pages/your-page.tsx
import Layout from '@components/layout';
import AgentNavigation from '@components/agentnavigation';
import AgentInfo from '@components/agentinfo';
import AgentChat from '@components/agentchat';

const ChatPage = () => (
    <Layout>
        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gridTemplateRows: '250px 1fr', height: '100%' }}>
            <div style={{ gridColumn: '1', gridRow: '1 / -1' }}>
                <AgentNavigation />
            </div>
            <div style={{ gridColumn: '2', gridRow: '1' }}>
                <AgentInfo />
            </div>
            <div style={{ gridColumn: '2', gridRow: '2' }}>
                <AgentChat />
            </div>
        </div>
    </Layout>
);

export default ChatPage;
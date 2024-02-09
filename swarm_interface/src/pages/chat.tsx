// pages/your-page.tsx
import Layout from '@/components/global_layout/layout';
import AgentNavigation from '@/components/chat/agentnavigation';
import AgentInfo from '@/components/chat/agentinfo';
import AgentChat from '@/components/chat/agentchat';

const ChatPage = () => (
    <Layout>
        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gridTemplateRows: '100px 1fr', height: '100%', width: '100%', overflow: 'hidden' }}>
            <div style={{ gridColumn: '1', gridRow: '1 / -1' }}>
                <AgentNavigation />
            </div>
            <div style={{ gridColumn: '2', gridRow: '1' }}>
                <AgentInfo />
            </div>
            <div style={{ gridColumn: '2', gridRow: '2', height: 'calc(100vh-48px)' }}> {/* Example fixed height calculation */}
                <AgentChat />
            </div>
        </div>
    </Layout>
);

export default ChatPage;
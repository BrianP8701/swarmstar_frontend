// pages/chat.tsx
import Layout from '@/components/global_layout/layout';
import ChatNavigation from '@/components/chat/chatnavigation';
import ChatSection from '@/components/chat/chatsection';

const ChatPage = () => (
    <Layout>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gridTemplateRows: '50px 1fr', height: '100%', width: '100%', overflow: 'hidden' }}>
            <div style={{ gridColumn: '1', gridRow: '1 / -1' }}>
                <ChatNavigation />
            </div>
            <div style={{ gridColumn: '2', gridRow: '2', height: 'calc(100vh-48px)' }}> {/* Example fixed height calculation */}
                <ChatSection />
            </div>
        </div>
    </Layout>
);

export default ChatPage;
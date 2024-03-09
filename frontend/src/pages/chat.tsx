import Layout from '@/components/global_layout/layout';
import ChatNavigation from '@/components/chat/chatnavigation';
import ChatSection from '@/components/chat/chatsection';

const ChatPage = () => (
    <Layout>
        <div style={{ display: 'flex', height: '100%', width: '100%', overflow: 'hidden' }}>
            <div style={{ width: '250px', overflowY: 'auto', flexShrink: 0 }}>
                <ChatNavigation />
            </div>
            <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                <ChatSection />
            </div>
        </div>
    </Layout>
);

export default ChatPage;
import React from 'react';
import Sidebar from '@components/sidebar';
import HeaderBar from '@components/headerbar';
import { GlobalProvider } from '@/configs/GlobalContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <GlobalProvider>
    <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gridTemplateRows: '48px 1fr' }}>
      <div style={{ gridRow: '1 / -1', gridColumn: '1' }}>
        <Sidebar />
      </div>
      <div style={{ gridColumn: '2', gridRow: '1' }}>
        <HeaderBar />
      </div>
      <main style={{ gridColumn: '2', gridRow: '2', backgroundColor: '#343541', height: 'calc(100vh - 48px)', overflow: 'auto' }}>{children}</main>
    </div>
  </GlobalProvider>
);

export default Layout;
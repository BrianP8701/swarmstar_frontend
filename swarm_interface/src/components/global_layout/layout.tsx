import React from 'react';
import Sidebar from '@/components/global_layout/sidebar';
import HeaderBar from '@/components/global_layout/headerbar';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gridTemplateRows: '48px 1fr' }}>
    <div style={{ gridRow: '1 / -1', gridColumn: '1' }}>
      <Sidebar />
    </div>
    <div style={{ gridColumn: '2', gridRow: '1' }}>
      <HeaderBar />
    </div>
    <main style={{ gridColumn: '2', gridRow: '2', backgroundColor: '#343541', height: 'calc(100vh - 48px)', width: 'calc(100vw-40px)', overflow: 'auto' }}>{children}</main>
  </div>
);

export default Layout;
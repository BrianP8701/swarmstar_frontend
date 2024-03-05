import React, { useEffect } from 'react';
import Sidebar from '@/components/global_layout/sidebar';
import { useRouter } from 'next/router';
import useAuthCheck from '@/hooks/authentication/auth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isAuthenticated = useAuthCheck();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);


  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '40px' }}>
        <Sidebar />
      </div>
      <main style={{ flexGrow: 1, backgroundColor: '#343541', height: '100vh', overflow: 'auto' }}>{children}</main>
    </div>
  );
};

export default Layout;
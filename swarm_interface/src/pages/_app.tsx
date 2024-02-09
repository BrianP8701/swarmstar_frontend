import { useRouter } from 'next/router';
import useAuthCheck from '@/hooks/authCheck';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { GlobalProvider } from '@/configs/GlobalContext';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isAuthenticated = useAuthCheck();
  const [pageRestored, setPageRestored] = useState(false);
  const [redirectPerformed, setRedirectPerformed] = useState(false);

  // Page restoration logic
  useEffect(() => {
    if (!redirectPerformed && isAuthenticated !== null) {
      const savedPage = localStorage.getItem('currentPage');
      if (savedPage && router.pathname !== savedPage) {
        router.push(savedPage).then(() => setPageRestored(true));
      } else {
        setPageRestored(true); // No restoration needed, but ready for auth checks
      }
    }
  }, [isAuthenticated, router, redirectPerformed]);

  // Authentication redirection logic
  useEffect(() => {
    if (pageRestored && !redirectPerformed) {
      if (isAuthenticated === false && router.pathname !== '/login') {
        router.push('/login').then(() => setRedirectPerformed(true));
      } else if (isAuthenticated === true && router.pathname === '/login') {
        router.push('/spawn').then(() => setRedirectPerformed(true));
      }
    }
  }, [isAuthenticated, router, pageRestored, redirectPerformed]);

  // Save current page
  useEffect(() => {
    if (isAuthenticated !== null) {
      localStorage.setItem('currentPage', router.pathname);
    }
  }, [router.pathname, isAuthenticated]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
};

export default App;
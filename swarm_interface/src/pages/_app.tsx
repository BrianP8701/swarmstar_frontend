import { useRouter } from 'next/router';
import useAuthCheck from '@/hooks/authCheck';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { GlobalProvider } from '@/configs/GlobalContext';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isAuthenticated = useAuthCheck();

  useEffect(() => {
    if (isAuthenticated === false) {
      if (router.pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [isAuthenticated, router]);

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

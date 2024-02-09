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
    // This function will only run on the client side
    const handleRouting = () => {
      let currentPage = localStorage.getItem('currentPage');
      if (currentPage === null) {
        currentPage = '/spawn';
        localStorage.setItem('currentPage', currentPage);
      }
      if (isAuthenticated === null || isAuthenticated === false) {
        router.push('/login');
      } else if (isAuthenticated === true && currentPage !== router.pathname) {
        router.push(currentPage);
      }
    };

    if (typeof window !== "undefined") {
      handleRouting();
    }
  }, [isAuthenticated, router]);

  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
};

export default App;
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
      router.push('/login');
    }
    if (isAuthenticated === true) {
      router.push('/spawn');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a more sophisticated loader/spinner
  }

  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
};

export default App;

import { useRouter } from 'next/router';
import useAuthCheck from '@/hooks/authCheck';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import '@/styles/globals.css';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';
import { Provider } from 'react-redux';



const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isAuthenticated = useAuthCheck();

  useEffect(() => {
    // This function will only run on the client side
    const handleRouting = () => {
      let currentPage = router.pathname;
      if (isAuthenticated === null || isAuthenticated === false && currentPage !== '/login') {
        router.push('/login');
      } else if (isAuthenticated === true && currentPage === '/login') {
        router.push('/spawn');
      }
    };

    if (typeof window !== "undefined") {
      handleRouting();
    }
  }, [isAuthenticated]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default App;

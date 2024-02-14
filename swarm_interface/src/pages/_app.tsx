import { AppProps } from 'next/app';
import '@/styles/globals.css';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';
import { Provider } from 'react-redux';
import useSSE from '@/hooks/useSSE'; // Import your hook

const App = ({ Component, pageProps }: AppProps) => {
  useSSE();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default App;

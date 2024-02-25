import { AppProps } from 'next/app';
import '@/styles/globals.css';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';
import { Provider } from 'react-redux';
import { WebSocketProvider } from '@/hooks/websocketcontext'; // Ensure this path is correct

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WebSocketProvider> {/* Wrap your component tree with WebSocketProvider */}
          <Component {...pageProps} />
        </WebSocketProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

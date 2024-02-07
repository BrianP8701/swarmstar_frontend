import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; // You might need to install js-cookie

import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken'); // Replace 'jwtToken' with your cookie name
    if (!jwtToken) {
      router.push('/login');
    } else {
      router.push('/spawn');
    }
  }, []);

  return <Component {...pageProps} />;
};

export default MyApp;
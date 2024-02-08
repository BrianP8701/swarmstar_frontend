import { useEffect, useState } from 'react';
import Sidebar from '@components/Sidebar';
import Main from '@components/MainArea';
import HeaderBar from '@components/HeaderBar';
import Login from '@components/Login';
import { isAuthenticated } from '@api/authentication';

function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      setAuth(isAuth);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {auth ? (
        <div className="flex h-screen w-screen overflow-hidden fixed">
          <div className="flex h-12 w-[calc(100vw-10rem)] bg-my-black fixed ml-10 z-10">
            <HeaderBar />
          </div>
          <div className="flex h-screen w-10 bg-my-black fixed z-10">
            <Sidebar />
          </div>
          <div className="flex h-[calc(100vh-3rem)] w-[calc(100vw-10rem)] fixed ml-10 mt-12">
            <Main />
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-screen justify-center items-center bg-chatgpt-gray">
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;
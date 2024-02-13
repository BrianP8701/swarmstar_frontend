import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const useAuthHook = () => {
  console.log('auth hook')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  if (typeof window === "undefined") {
    return false;
  }
  const token = useSelector((state: RootStateType) => state.user.token);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/auth_token', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Type': 'auth'
          },
        });
        const data = await response.json();
        console.log('data:', data)
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          console.log(data.error)
        }
      } catch (error) {
        setIsAuthenticated(false);
        throw error;
      }
    };
    checkAuth();
  }, [token]);

  return isAuthenticated;
};

export default useAuthHook;

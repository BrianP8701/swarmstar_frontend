import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const useAuthHook = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  if (typeof window === "undefined") {
    return false;
  }
  const token = useSelector((state: RootStateType) => state.token.token);
  console.log('used token in useAuthHook:', token)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/authentication/auth_token', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'credentials': 'include'
          },
        });
        const data = await response.json();
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

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const useAuthCheck = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  if (typeof window === "undefined") {
    return false;
  }
  const token = useSelector((state: RootStateType) => state.user.token);

  useEffect(() => {

    const checkAuth = async () => {
      try {
        const response = await fetch('/api/authCheck', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        throw error;
      }
    };
    checkAuth();
  }, [router.pathname]);

  return isAuthenticated;
};

export default useAuthCheck;

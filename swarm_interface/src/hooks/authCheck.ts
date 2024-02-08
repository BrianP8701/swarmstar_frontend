import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useAuthCheck = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/authCheck', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();

        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
        throw error;
      }
    };
    checkAuth();
  }, [router]);

  return isAuthenticated;
};

export default useAuthCheck;

import { useEffect } from 'react';
import { useRouter } from 'next/router';

function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Function to check if the user is logged in
    const isLoggedIn = () => {
      // Here, implement logic to check for JWT in cookies
      // For simplicity, this is just a placeholder
      return false;
    };

    if (isLoggedIn()) {
      router.replace('/dashboard'); // If logged in, redirect to dashboard
    }
  }, []);

  return (
    <div>
      <h1>Login</h1>
      {/* Login form goes here */}
    </div>
  );
}

export default LoginPage;

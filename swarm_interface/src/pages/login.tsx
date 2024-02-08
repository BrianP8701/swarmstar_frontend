import React, { useState } from 'react';
import useHandleLogin from '@hooks/handleLogin';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { handleLogin } = useHandleLogin();
  const router = useRouter();

  const login = async () => {
    try {
      await handleLogin(username, password);
      setErrorMessage(''); // Clear error message on successful login
      router.push('/spawn'); // Route to the spawn page on successful login
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-800">
      <div className="w-60">
        <input
          id="username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="text-border-white block w-full mb-5"
        />
        <input
          id="password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="text-border-white block w-full"
        />
        <div className="flex items-center justify-center">
          <button
            className="button-text mt-8"
            type="button"
            onClick={login}
          >
            Login
          </button>
        </div>
        {errorMessage && ( 
          <div className="text-red-500 text-center mt-2">{errorMessage}</div>
        )}
        <div className="flex justify-center items-center">
          <a href="/signup" className="button-text mt-2">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useContext } from 'react';
import { GlobalContext } from '@/configs/GlobalContext';
import { User } from '@models/user';
import useHandleLogin from '@hooks/handleLogin'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useHandleLogin(); // Corrected usage

  const login = async () => {
    try {
      await handleLogin(username, password);
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-chatgpt-gray">
      <div className="bg-chatgpt-gray p-8 rounded-lg shadow-my-outer">
        <div className="mb-4">
          <input
            id="username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="bg-chatgpt-gray text-white border border-gray-700 rounded s py-2 px-4 block w-full appearance-none leading-normal"
          />
        </div>
        <div className="mb-6">
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-chatgpt-gray text-white border border-gray-700 rounded s py-2 px-4 block w-full appearance-none leading-normal"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-chatgpt-gray hover:bg-gray-700 text-white font-bold py-2 px-4 rounded s focus:outline-none focus:shadow-outline"
            type="button"
            onClick={login}
          >
            Login
          </button>
        </div>
        <div className="mt-4 text-center">
          <a href="/signup" className="text-white hover:text-gray-400 text-sm font-bold">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;


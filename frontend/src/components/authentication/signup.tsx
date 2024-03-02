import React, { useState, useEffect } from 'react';
import useSignUp from '@/hooks/authentication/signUp';
import { useRouter } from 'next/router';
import useAuthCheck from '@/hooks/authentication/auth';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { handleSignUp } = useSignUp();
    const router = useRouter();

    const isAuthenticated = useAuthCheck();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/spawn');
        }
    }, [isAuthenticated, router]);

    const signUp = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        if (username.length <= 6) {
            setErrorMessage('Username must be greater than 6 characters');
            return;
        }
        if (password.length <= 8) {
            setErrorMessage('Password must be greater than 8 characters');
            return;
        }
        try {
            await handleSignUp(username, password);
            setErrorMessage('');
            router.push('/spawn');
        } catch (error: any) {
            console.log('Error signing up:', error);
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
                    className="text-border-white block w-full mb-2"
                />
                <input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-border-white block w-full mb-2"
                />
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="text-border-white block w-full mb-2"
                />
                <div className="flex items-center justify-center">
                    <button
                        className="button-text mt-8"
                        type="button"
                        onClick={signUp}
                    >
                        Sign Up
                    </button>
                </div>
                {errorMessage && (
                    <div className="text-red-500 text-center mt-2">{errorMessage}</div>
                )}
            </div>
        </div>
    );
};

export default SignUp;

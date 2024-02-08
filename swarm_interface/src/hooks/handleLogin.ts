import { useContext } from 'react';
import { GlobalContext } from '@configs/GlobalContext';
import { User } from '@models/user';

const useHandleLogin = () => {
    const { setUser } = useContext(GlobalContext);

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await fetch('/api/handleLogin', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setUser(data.user as unknown as User);
            } else {
                throw new Error('Login failed due to server error');
            }
        } catch (error) {
            throw error;
        }
    };

    return { handleLogin };
};

export default useHandleLogin;

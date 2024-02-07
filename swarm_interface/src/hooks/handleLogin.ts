import { useContext } from 'react';
import { GlobalContext } from '@configs/GlobalContext';
import { User } from '@models/user';

const useHandleLogin = () => {
    const { setUser } = useContext(GlobalContext);

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await fetch('/api/handleLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData as unknown as User);
            }
        } catch (error) {
            console.error('Failed to connect to the server');
        }
    };

    return { handleLogin };
};

export default useHandleLogin;

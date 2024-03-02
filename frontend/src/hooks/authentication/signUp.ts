import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/tokenSlice';
import { setUser, UserState } from '@/redux/userSlice';


const useSignUp = () => {
    const dispatch = useDispatch();

    const handleUserData = (user: UserState, token: string) => {
        dispatch(setUser(user));
        dispatch(setToken(token));
    };

    const handleSignUp = async (username: string, password: string) => {
        try {
            const response = await fetch('/api/authentication/signup', {
                method: 'PUT',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                handleUserData(data.user, data.token);
            } else {
                console.log('Error signing up1:', data);
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error signing up2:', error);
            throw error;
        }
    };
    return { handleSignUp };
};

export default useSignUp;

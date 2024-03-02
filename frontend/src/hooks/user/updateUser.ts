/*
Takes a dict. Updates user object in redux accordingly
and updates the backend with the new user information.
*/
import { useDispatch, useSelector } from 'react-redux';
import { setUser, UserState } from '@/redux/userSlice';
import { RootStateType } from '@models/rootstate';

const useUpdateUser = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootStateType) => state.token.token);

    const handleUpdateUser = async (updates: Partial<UserState>) => {
        try {
            const response = await fetch('/api/user/update_user', {
                method: 'PUT',
                body: JSON.stringify({ user_updates: updates }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();

            if (response.ok) {
                dispatch(setUser(data.user));
            } else {
                throw new Error('Updating user failed due to server error');
            }
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    };
    return { handleUpdateUser };
};

export default useUpdateUser;

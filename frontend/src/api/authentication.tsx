import config from '@configs/configLoader';


const handleLogin = async (username: string, password: string): Promise<Record<string, any>> => {
    try {
        const response = await fetch(config.login_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            console.error(response);
            throw new Error(`Login request failed with status: ${response.status}`);
        }

        // Extract the user data from the response
        const responseData = await response.json();
        // const user: User = responseData.user;
        // setUser(user);

        return responseData; // This is now a User type object

    } catch (error) {
        console.error(error);
        throw error;
    }
}

const isAuthenticated = async (): Promise<boolean> => {
    try {
        const response = await fetch(config.authentication_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            return false;
        }

    } catch (error) {
        console.error(error);
        return false;
    }

    return true;
};

export { handleLogin, isAuthenticated };


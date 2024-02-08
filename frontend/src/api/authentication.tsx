

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


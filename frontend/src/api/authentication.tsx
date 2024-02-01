

const handleLogin = async (username: string, password: string, backendUrl: string) => {
    try {
        const response = await fetch(backendUrl + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Store token in localStorage
    } catch (error) {
        console.error(error);
    }
}

const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
};

const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

export { handleLogin, handleLogout, isAuthenticated };


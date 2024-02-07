// components/SomeComponent.jsx or in a page file
interface UserData {
    username: string;
    password: string;
    // add more fields as necessary
}

async function sendDataToAzure(data: UserData) {
    const response = await fetch('/api/sendToAzure', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to send data to Azure');
    }

    return response.json(); // Assuming the Azure Function returns JSON data
}

// Example usage within a React component
function MyComponent() {
    const handleSubmit = async () => {
        const data: UserData = { username: 'username', password: 'password' };
        try {
            const result = await sendDataToAzure(data);
            console.log('Data sent to Azure successfully:', result);
        } catch (error) {
            console.error('Error sending data to Azure:', error);
        }
    };

    return (
        <button onClick={handleSubmit}>Send Data to Azure</button>
    );
}

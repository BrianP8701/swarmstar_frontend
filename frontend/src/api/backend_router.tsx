
// Utility function to send data to the backend
export async function sendDataToBackend(data: Record<string, any>, backendUrl: string): Promise<any> {
    try {
        const response = await fetch(backendUrl + '/post_router', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("There was an error sending data to the backend", error);
        throw error;
    }
}

export async function getDataFromBackend(backendUrl: string, endpoint: string): Promise<any> {
    try {
        const response = await fetch(backendUrl + '/get_router', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ endpoint }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("There was an error getting data from the backend", error);
        throw error;
    }
}

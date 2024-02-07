// pages/api/sendToAzure.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Your Azure Function URL
            const azureFunctionUrl = 'https://your-azure-function-url.com/api/functionName';

            // Forward the request body to the Azure Function
            const response = await fetch(azureFunctionUrl, {
                method: 'POST',
                body: JSON.stringify(req.body),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Wait for the Azure Function to process the request and return a response
            const data = await response.json();

            // Send the Azure Function's response back to the client
            res.status(200).json(data);
        } catch (error) {
            // Handle any errors that occur during the fetch
            res.status(500).json({ error: 'Failed to connect to Azure Function' });
        }
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

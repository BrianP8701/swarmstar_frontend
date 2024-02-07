import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@configs/configLoader';

export default async function handleLogin(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = req.body;
    try {
        const response = await fetch(config.login_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            console.error(response);
            return res.status(response.status).json({ error: `Login request failed with status: ${response.status}` });
        }

        // Extract the user data from the response
        const responseData = await response.json();

        return res.status(200).json(responseData);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

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
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@configs/configLoader';

export default async function handleSignup(req: NextApiRequest, res: NextApiResponse) {
    const { username, password, openai_key } = req.body;

    try {
        const response = await fetch(config.signup_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, openai_key }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            // Instead of throwing here, directly send the error response
            return res.status(response.status).json({ error: errorData.error || 'An error occurred' });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        // This will catch other errors, like network issues, JSON parsing errors, etc.
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@configs/configLoader';

export default async function getSwarm(req: NextApiRequest, res: NextApiResponse) {
    const { swarm_id } = req.body;

    try {
        const response = await fetch(config.create_swarm_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ swarm_id }),
        });

        if (!response.ok) {
            const errorDetail = await response.text();
            throw new Error(`Getting swarm failed with status: ${response.status} and message: ${errorDetail}`);
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
